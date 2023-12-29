import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';

@Module({
  providers: [ProductoService],
  controllers: [ProductoController]
})
export class ProductoModule {}
