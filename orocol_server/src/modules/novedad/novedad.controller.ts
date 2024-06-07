import { Controller, Get, Param, Post, Body, Put, ValidationPipe, UsePipes, ParseIntPipe, UseGuards } from '@nestjs/common';
import { NovedadService } from './novedad.service';
import { NovedadDto } from 'src/dto/novedad.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { RolNombre } from '../../enums/rol.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/rol.guard';

@ApiBearerAuth()
@ApiTags('Novedades de mineros')
@Controller('novedad')
export class NovedadController {

    constructor(private readonly novedadService: NovedadService) {}

    @RolDecorator(RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard) 
    @Post(':idTurno')
    async registrarNovedades(@Param('idTurno') idTurno: number,
        @Body() dto: NovedadDto,
    ): Promise<any> {
        return this.novedadService.registrarNovedad(idTurno, dto);
    }
    
    @RolDecorator(RolNombre.MINERO, RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard) 
    @Get(':idNovedad')
    async consultarNovedad(@Param('idNovedad', ParseIntPipe) idNovedad: number) {
        return await this.novedadService.consultarNovedad(idNovedad);
    }
    
    @RolDecorator(RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard) 
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':idNovedad')
    async editarNovedad(@Param('idNovedad', ParseIntPipe) idNovedad: number, @Body() dto: NovedadDto) {
        return await this.novedadService.editarNovedad(idNovedad, dto);
    }
}
