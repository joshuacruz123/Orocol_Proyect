import { UsuarioService } from './usuario.service';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { InactivarUsuarioDto } from 'src/dto/enum.dto';
import { RolNombre } from '../../enums/rol.enum';
import { LoginUsuarioDto } from 'src/dto/login.dto';
import { TokenDto } from 'src/dto/token.dto';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/rol.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { PerfilDto } from 'src/dto/perfil.dto';
import { PasswordDto } from 'src/dto/editar-password.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Usuarios')
@Controller('usuario')
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService) { }

    @ApiBearerAuth()
    @RolDecorator(RolNombre.ADMINISTRADOR, RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Put(':idUsuario')
    async inactivarUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number, @Body() dto: InactivarUsuarioDto) {
        return await this.usuarioService.inactivarUsuario(idUsuario, dto);
    }

    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Post('login')
    ingresarAlSistema(@Body() dto: LoginUsuarioDto) {
        return this.usuarioService.ingresarAlSistema(dto);
    }

    @Post('refresh')
    refresh(@Body() dto: TokenDto) {
        return this.usuarioService.refresh(dto);
    }

    @ApiBearerAuth()
    @RolDecorator(RolNombre.ADMINISTRADOR, RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put('password/:idUsuario')
    async editarPassword(@Param('idUsuario', ParseIntPipe) idUsuario: number, @Body() dto: PasswordDto) {
        return await this.usuarioService.editarPassword(idUsuario, dto);
    }
    
    @ApiBearerAuth()
    @RolDecorator(RolNombre.ADMINISTRADOR, RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard) 
    @Post(':idUsuario/perfil')
    @ApiParam({ name: 'idUsuario', description: 'ID del usuario' }) // Documentar el parámetro de ruta
    @ApiConsumes('multipart/form-data') // Especificar el tipo de contenido consumido (para la carga de archivos)
    @UseInterceptors(FileInterceptor('fotoPerfil'))
    @ApiBody({
        description: 'Carga de foto de perfil de usuario',
        type: PerfilDto, // Clase DTO para el cuerpo de la solicitud
    })
    async subirFotoPerfil(
        @Param('idUsuario') idUsuario: number,
        @UploadedFile() fotoPerfil: Express.Multer.File,
        @Body() dto: PerfilDto
    ) {
        return this.usuarioService.subirFotoPerfil(idUsuario, fotoPerfil, dto);
    }
     
    @ApiBearerAuth()
    @RolDecorator(RolNombre.ADMINISTRADOR, RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard) 
    @Get(':idUsuario/perfil')
    async consultarPerfil(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
        return await this.usuarioService.consultarPerfil(idUsuario);
    }
}
