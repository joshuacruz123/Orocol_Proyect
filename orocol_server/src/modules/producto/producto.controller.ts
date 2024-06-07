import { Controller, Get, Param, Post, Body, Put, Delete, ValidationPipe, UsePipes, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoDto } from '../../dto/producto.dto';
import { EstadoProductoDto } from 'src/dto/enum.dto';
import { RolNombre } from '../../enums/rol.enum';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/rol.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Productos')
@Controller('producto')
export class ProductoController {
 
    constructor(private readonly productoService: ProductoService) {}

    @RolDecorator(RolNombre.ADMINISTRADOR, RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async consultarProductos() {
        return await this.productoService.consultarProductos();
    } 

    @RolDecorator(RolNombre.ADMINISTRADOR, RolNombre.MINERO)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':IdProducto')
    async consultarProducto(@Param('IdProducto', ParseIntPipe) IdProducto: number) {
        return await this.productoService.consultarProducto(IdProducto);
    }

    @RolDecorator(RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async registrarProducto(@Body() dto: ProductoDto) {
        return await this.productoService.insertarProducto(dto);
    } 

    @RolDecorator(RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put('desactivar/:IdProducto')
    async desactivarProducto(@Param('IdProducto', ParseIntPipe) IdProducto: number, @Body() dto: EstadoProductoDto){
        return await this.productoService.desactivarProducto(IdProducto, dto);
    }

    @RolDecorator(RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put('activar/:IdProducto')
    async activarProducto(@Param('IdProducto', ParseIntPipe) IdProducto: number, @Body() dto: EstadoProductoDto){
        return await this.productoService.activarProducto(IdProducto, dto);
    }
}
