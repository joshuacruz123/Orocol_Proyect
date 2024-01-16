import { Module } from '@nestjs/common';
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntradaVentaEntity } from './entradaventas.entity';
import { SalidaVentaEntity } from './salidaventas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EntradaVentaEntity, SalidaVentaEntity])],
  providers: [VentaService],
  controllers: [VentaController]
})
export class VentaModule {}
