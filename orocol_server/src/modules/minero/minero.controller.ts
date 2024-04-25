import { Controller, Get, Param, Post, Body, Put, ValidationPipe, UsePipes, ParseIntPipe, UseGuards } from '@nestjs/common';
import { MineroService } from './minero.service';
import { EditarMineroDto, mineroDto } from '../../dto/minero.dto';
import { RolNombre } from '../rol/rol.enum';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/rol.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { MineroEntity } from './minero.entity';

@ApiTags('Usuarios mineros')
@Controller('minero')
export class MineroController {

    constructor(private readonly mineroService: MineroService) {}

    @ApiBearerAuth()
    @Get()
    @RolDecorator(RolNombre.ADMINISTRADOR, RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async consultarMineros(): Promise<MineroEntity[]> {
        return await this.mineroService.consultarMineros();
    } 

    @ApiBearerAuth()
    @Get(':IdMinero')
    @RolDecorator(RolNombre.ADMINISTRADOR, RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async consultarMinero(@Param('IdMinero', ParseIntPipe) IdMinero: number) {
        return await this.mineroService.consultarMinero(IdMinero);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async registrarUsuarioMinero(@Body() dto: mineroDto) {
        return await this.mineroService.registrarUsuarioMinero(dto);
    }
    
    @ApiBearerAuth()
    @RolDecorator(RolNombre.ADMINISTRADOR, RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':IdMinero')
    async editarMinero(@Param('IdMinero', ParseIntPipe) IdMinero: number, @Body() dto: EditarMineroDto) {
        return await this.mineroService.editarMinero(IdMinero, dto);
    }
}
