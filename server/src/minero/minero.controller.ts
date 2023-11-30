import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { MineroService } from './minero.service';
import { Minero } from './minero.entity';

@Controller('minero')
export class MineroController {
    constructor(private readonly mineroService: MineroService) {}
    /*
    @Get()
    findAll(): Promise<Usuario[]> {
        return this.usuariosService.findAll();
    }*/

    @Post()
    registrarMinerosPropio(@Body() mineroData: Minero): Promise<Minero> {
        return this.mineroService.registrarMinero(mineroData);
    }
    
    @Get(':IdMinero')
    consultarMineroPropio(IdMinero: number): Promise<Minero> {
        return this.mineroService.consultarMinero(IdMinero);
    }
    
    @Put(':IdMinero')
    editarMineroPropio(@Param('IdMinero') IdMinero: number, @Body() mineroData: Minero): Promise<Minero> {
        return this.mineroService.editarMinero(IdMinero, mineroData);
    }
    
    @Post()
    responderSolicitud(@Body() mineroData: Minero): Promise<Minero> {
        return this.mineroService.resSolicitudEditarDoc(mineroData);
    }
 
    @Post()
    registrarAsistencias(@Body() mineroData: Minero): Promise<Minero> {
        return this.mineroService.registrarAsistencia(mineroData);
    }

    @Post()
    EnviarNovedad(@Body() mineroData: Minero): Promise<Minero> {
        return this.mineroService.registrarNovedad(mineroData);
    }

    /*
    @Delete(':IdMinero')
    eliminarUsuario(@Param('IdMinero') IdMinero: number): Promise<void> {
        return this.MineroService.delete(IdMinero);
    }*/
}
 