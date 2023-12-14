import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CompraService } from './compra.service';
import { Cliente } from './cliente.entity';

@Controller('compra')
export class CompraController {
    constructor(private readonly compraService: CompraService) {}

    @Post()
    async registrarCompra(@Body() compraData: Cliente): Promise<Cliente> {
        return this.compraService.insertarCliente(compraData);
    }
    // Método para controlar registro de las compras
    
    @Get()
    async verCliente(): Promise<Cliente[]> {
        return this.compraService.consultarCliente();
    }
    // Método para controlar consulta de las compras
    
    @Put(':IdCliente')
    async actualizarProducto(@Param('IdCliente') IdCliente: number, @Body() compraData: Cliente): Promise<Cliente> {
        try {
            return await this.compraService.editarCliente(IdCliente, compraData);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }
    // Método para controlar edición de las compras

    @Put('/inactivar/:IdCliente')
    async inactivarProducto(@Param('IdCliente') IdCliente: number): Promise<string> {
        try {
            await this.compraService.anularCompra(IdCliente);
            return 'La compra ahora es inactiva en el sistema.';
        } catch (error) {
            return `Error al inactivar compra: ${error.message}`;
        }
    } 
    // Método para controlar inactivación de las compras 

    @Get()
    async generarReportesCompra(): Promise<Cliente[]> {
        return this.compraService.GenerarReporteCompra(); 
    }
    // Método para controlar generación de reportes de las compras  
} 
