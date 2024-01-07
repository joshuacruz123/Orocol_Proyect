import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompraService } from './compra.service';
import { CompraController } from './compra.controller';
import { VentaModule } from '../venta/venta.module';
import { MineroModule } from '../minero/minero.module';
import { ProductoModule } from '../producto/producto.module';
import { RolModule } from '../rol/rol.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { VentaService } from '../venta/venta.service';
import { MineroService } from '../minero/minero.service';
import { ProductoService } from '../producto/producto.service';
import { RolService } from '../rol/rol.service';
import { UsuarioService } from '../usuario/usuario.service';
import { Cliente } from './cliente.entity';
import { SalidaVenta } from '../venta/salidaventas.entity';
import { Minero } from '../minero/minero.entity';
import { TurnoMinero } from '../minero/turno.entity';
import { Producto } from '../producto/producto.entity';
import { Rol } from '../rol/rol.entity';
import { Usuario } from '../usuario/usuario.entity';
import { EntradaVenta } from '../venta/entradaventas.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Cliente, EntradaVenta, SalidaVenta, Producto, Minero, TurnoMinero, Rol, Usuario]),
  VentaModule, ProductoModule, MineroModule, RolModule, UsuarioModule,
],
  providers: [CompraService, VentaService, ProductoService, MineroService, RolService, UsuarioService],
  controllers: [CompraController]
})
export class CompraModule {} 
 