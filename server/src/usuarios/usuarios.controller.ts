/* .controller.ts procesa las solicitudes del usuario
 y actúa como intermediario entre el modelo y la vista*/
// Para crear controller: nest g controller nombre --no-spec
import { Controller, Get, Param, Post, Body, Put, NotFoundException, BadRequestException } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuarios.entity';

@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuarioService: UsuariosService) {}

    @Post()
    async registrarNuevoUsuario(@Body() usuarioData: Usuario): Promise<string> {
        try {
            const nuevoUsuario = await this.usuarioService.registrarUsuario(usuarioData);
            
            if (nuevoUsuario.rol.tipoRol === 'Administrador' || nuevoUsuario.rol.tipoRol === 'Minero') {
                return 'Registro en la tabla usuario exitoso.';
            } else {
                throw new BadRequestException('Rol no válido para el usuario.');
            }
        } catch (error) {
            throw new BadRequestException(error.message);
        } 
    }
    // Método para controlar registro de usuario

    @Post('iniciar-sesion')
    async iniciarSesion(@Body() usuarioData: Usuario): Promise<string> {
        const usuario = await this.usuarioService.ingresarAlSistema(usuarioData.idUsuario, usuarioData);

        if (usuario) {
            if (usuario.rol.tipoRol === 'Administrador') {
                return 'Usuario administrador ingresando al sistema';
            } else if (usuario.rol.tipoRol === 'Minero') {
                return 'Usuario minero ingresando al sistema';
            }
        }

        throw new BadRequestException('Error al ingresar al sistema');
    }
    // Método para controlar inicio de sesión  de usuario

    @Put(':idUsuario/inactivar')
    async inactivarUsuario(@Param('idUsuario') idUsuario: number): Promise<string> {
        try {
            const usuario = await this.usuarioService.inactivarUsuario(idUsuario);
            return 'El usuario ahora es inactivo del sistema';
        } catch (error) {
            throw new NotFoundException('Error al inactivar usuario: ' + error.message);
        }
    }
    // Método para controlar inactivación de usuario
}
