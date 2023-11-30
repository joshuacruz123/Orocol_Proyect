import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CompraService } from './compra.service';
import { Cliente } from './cliente.entity';

@Controller('compra')
export class CompraController {
    constructor(private readonly compraService: CompraService) {}
    /*
    @Get()
    findAll(): Promise<Usuario[]> {
        return this.usuariosService.findAll(); 
    }*/

    @Post()
    registrarCompra(@Body() compraData: Cliente): Promise<Cliente> {
        return this.compraService.insertarCliente(compraData);
    }
    
    @Get(':IdCliente')
    verCliente(IdCliente: number): Promise<Cliente> {
        return this.compraService.consultarCliente(IdCliente);
    } 
    
    @Put(':IdCliente')
    actualizarCompra(@Param('IdCliente') IdCliente: number, @Body() compraData: Cliente): Promise<Cliente> {
        return this.compraService.editarCliente(IdCliente, compraData);
    }

    @Put(':IdCliente')
    anularCompra(@Param('IdCliente') IdCliente: number, @Body() compraData: Cliente): Promise<Cliente> {
        return this.compraService.anularCliente(IdCliente, compraData);
    }

    @Get()
    generarReportesCompra(): Promise<Cliente[]> {
        return this.compraService.GenerarReporteCompra(); 
    }

    /*
    @Delete(':IdCliente')
    eliminarUsuario(@Param('IdCliente') IdCliente: number): Promise<void> {
        return this.compraService.delete(IdCliente);
    }*/

} 
