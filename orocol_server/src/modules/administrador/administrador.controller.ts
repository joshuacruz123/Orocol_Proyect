import { Controller, Get, Param, Post, Body, Put, ValidationPipe, UsePipes, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AdministradorService } from './administrador.service';
import { AdministradorDto, EditarAdministradorDto } from '../../dto/administrador.dto';
import { InactivarUsuarioDto } from 'src/dto/enum.dto'; //
import { RolNombre } from '../rol/rol.enum';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/rol.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuarios administradores')
@Controller('administrador')
export class AdministradorController {

    constructor(private readonly administradorService: AdministradorService) {}

    @ApiBearerAuth()
    @Get()
    @RolDecorator(RolNombre.ADMINISTRADOR, RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async consultarAdministradores() {
        return await this.administradorService.consultarAdministradores();
    }
    
    @ApiBearerAuth()
    @Get(':idAdmin')
    @RolDecorator(RolNombre.ADMINISTRADOR, RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async consultarAdministrador(@Param('idAdmin', ParseIntPipe) idAdmin: number) {
        return await this.administradorService.consultarAdministrador(idAdmin);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async registrarUsuarioAdministrador(@Body() dto: AdministradorDto) {
        return await this.administradorService.registrarUsuarioAdministrador(dto);
    } 
    
    @ApiBearerAuth()
    @RolDecorator(RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':idAdmin')
    async editarAdministrador(@Param('idAdmin', ParseIntPipe) idAdmin: number, @Body() dto: EditarAdministradorDto) {
        return await this.administradorService.editarAdministrador(idAdmin, dto);
    }
    
    @ApiBearerAuth()
    @RolDecorator(RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put('activar/:idUsuario')
    async activarUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number, @Body() dto: InactivarUsuarioDto){
        return await this.administradorService.activarUsuario(idUsuario, dto);
    }
}
