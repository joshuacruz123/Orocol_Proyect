import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';

@Module({
  providers: [ProductoService],
  controllers: [ProductoController]
})
export class ProductoModule {}
