import { Module } from '@nestjs/common';
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';

@Module({
  providers: [VentaService],
  controllers: [VentaController]
})
export class VentaModule {}
