import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { MineroService } from './minero.service';
import { Minero } from './minero.entity';

@Controller('minero')
export class MineroController {
    constructor(private readonly mineroService: MineroService) {}

    @Post()
    async registrarMinerosPropio(@Body() mineroData: Minero): Promise<Minero> {
        return this.mineroService.registrarMinero(mineroData);
    }
    // Método para controlar registro del minero
    
    @Get(':IdMinero')
    async consultarMineroPropio(@Param('IdMinero') IdMinero: number): Promise<Minero> {
        try {
            return await this.mineroService.consultarMinero(IdMinero);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }
    // Método para controlar consulta del minero
    
    @Put(':IdMinero')
    async editarMineroPropio(@Param('IdMinero') IdMinero: number, @Body() mineroData: Minero): Promise<Minero> {
        try {
            return await this.mineroService.editarMinero(IdMinero, mineroData);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }
    // Método para controlar edición del minero

    /*
    @Post()
    responderSolicitud(@Body() mineroData: Minero): Promise<Minero> {
        return this.mineroService.resSolicitudEditarDoc(mineroData);
    }
    // Método para controlar respuesta de solicitud al minero
 
    @Post()
    registrarAsistencias(@Body() mineroData: Minero): Promise<Minero> {
        return this.mineroService.registrarAsistencia(mineroData);
    }
    // Método para controlar registro de asistencia del minero

    @Post()
    EnviarNovedad(@Body() mineroData: Minero): Promise<Minero> {
        return this.mineroService.registrarNovedad(mineroData);
    }
    // Método para controlar envio de novedad del minero
    */
}
 