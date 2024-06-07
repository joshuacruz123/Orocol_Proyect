import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { ProductoEntity } from 'src/entities/producto.entity';
import { EntradaVentaEntity } from 'src/entities/entradaventas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductoEntity, EntradaVentaEntity])],
  providers: [ProductoService],
  controllers: [ProductoController]
})
export class ProductoModule {}
