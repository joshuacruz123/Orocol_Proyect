import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';
import { EntradaVenta } from './entradaventas.entity';
import { SalidaVenta } from './salidaventas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EntradaVenta, SalidaVenta])],
  providers: [VentaService],
  controllers: [VentaController]
})
export class VentaModule {}
 