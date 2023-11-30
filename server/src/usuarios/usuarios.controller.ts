/* .controller.ts procesa las solicitudes del usuario
 y actúa como intermediario entre el modelo y la vista*/
// Para crear controller: nest g controller nombre --no-spec
import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuarios.entity';

@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) {}
    /*
    @Get()
    findAll(): Promise<Usuario[]> {
        return this.usuariosService.findAll();
    }*/
    
    @Post()
    iniciarSesion(@Body() usuarioData: Usuario): Promise<Usuario> {
        return this.usuariosService.ingresarAlSistema(usuarioData);
    }

    @Post()
    reactivarUsuario(@Body() usuarioData: Usuario): Promise<Usuario> {
        return this.usuariosService.solicitarReactivacion(usuarioData);
    }
}
