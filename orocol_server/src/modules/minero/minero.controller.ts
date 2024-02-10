import { Controller, Get, Param, Post, Body, Put, ValidationPipe, UsePipes, ParseIntPipe, UseGuards } from '@nestjs/common';
import { MineroService } from './minero.service';
import { mineroDto } from '../../dto/minero.dto';
import { RolNombre } from '../rol/rol.enum';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/rol.guard';

@Controller('minero')
export class MineroController {

    constructor(private readonly mineroService: MineroService) {}

    @RolDecorator(RolNombre.ADMINISTRADOR, RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async consultarMineros() {
        return await this.mineroService.consultarMineros();
    } 

    @RolDecorator(RolNombre.ADMINISTRADOR, RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':IdMinero')
    async consultarMinero(@Param('IdMinero', ParseIntPipe) IdMinero: number) {
        return await this.mineroService.consultarMinero(IdMinero);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async registrarUsuarioMinero(@Body() dto: mineroDto) {
        return await this.mineroService.registrarUsuarioMinero(dto);
    }
    
    @RolDecorator(RolNombre.ADMINISTRADOR, RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':IdMinero')
    async editarMinero(@Param('IdMinero', ParseIntPipe) IdMinero: number, @Body() dto: mineroDto) {
        return await this.mineroService.editarMinero(IdMinero, dto);
    }
    
    
    @RolDecorator(RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put('admin/:IdMinero')
    async editarMineroPorAdmin(@Param('IdMinero', ParseIntPipe) IdMinero: number, @Body() dto: mineroDto) {
        return await this.mineroService.editarMineroPorAdmin(IdMinero, dto);
    }
}
