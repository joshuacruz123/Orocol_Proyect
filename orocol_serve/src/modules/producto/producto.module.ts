import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { Producto } from './producto.entity';
import { EntradaVenta } from '../venta/entradaventas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto, EntradaVenta])],
  providers: [ProductoService],
  controllers: [ProductoController]
})
export class ProductoModule {}
 