import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { ProductoEntity } from './producto.entity';
import { EntradaVentaEntity } from '../venta/entradaventas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductoEntity, EntradaVentaEntity])],
  providers: [ProductoService],
  controllers: [ProductoController]
})
export class ProductoModule {}
