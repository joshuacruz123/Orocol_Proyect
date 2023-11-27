import { Module } from '@nestjs/common';
import { VentaController } from './venta.controller';
import { VentaService } from './venta.service';

@Module({
  controllers: [VentaController],
  providers: [VentaService]
})
export class VentaModule {}
