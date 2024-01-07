import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';
import { MineroModule } from '../minero/minero.module';
import { ProductoModule } from '../producto/producto.module';
import { RolModule } from '../rol/rol.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { MineroService } from '../minero/minero.service';
import { ProductoService } from '../producto/producto.service';
import { RolService } from '../rol/rol.service';
import { UsuarioService } from '../usuario/usuario.service';
import { EntradaVenta } from './entradaventas.entity';
import { SalidaVenta } from './salidaventas.entity';
import { Minero } from '../minero/minero.entity';
import { TurnoMinero } from '../minero/turno.entity';
import { Producto } from '../producto/producto.entity';
import { Rol } from '../rol/rol.entity';
import { Usuario } from '../usuario/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EntradaVenta, SalidaVenta, Minero, TurnoMinero, Producto, Rol, Usuario]),
    MineroModule, ProductoModule, RolModule, UsuarioModule,
  ],
  providers: [VentaService, MineroService, ProductoService, RolService, UsuarioService],
  controllers: [VentaController]
})
export class VentaModule {}
