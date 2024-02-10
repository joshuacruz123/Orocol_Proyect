import { Module } from '@nestjs/common';
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntradaVentaEntity } from './entradaventas.entity';
import { SalidaVentaEntity } from './salidaventas.entity';
import { ProductoModule } from '../producto/producto.module';
import { MineroModule } from '../minero/minero.module';
import { AdministradorModule } from '../administrador/administrador.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { MineroService } from '../minero/minero.service';
import { ProductoService } from '../producto/producto.service';
import { UsuarioService } from '../usuario/usuario.service';
import { ProductoEntity } from '../producto/producto.entity';
import { MineroEntity } from '../minero/minero.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { AdministradorEntity } from '../administrador/administrador.entity';
import { AdministradorService } from '../administrador/administrador.service';
import { RolEntity } from '../rol/rol.entity';
import { JwtService } from '@nestjs/jwt';
import { TurnoMineroEntity } from '../minero/turno.entity';
import { SalidaVentaController } from './salidaventa.controller';
import { ReportesVentasController } from './reporteventa.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EntradaVentaEntity, SalidaVentaEntity, ProductoEntity, MineroEntity, TurnoMineroEntity, AdministradorEntity, RolEntity, UsuarioEntity]),
  ProductoModule, MineroModule, AdministradorModule, UsuarioModule,
  ],
  providers: [VentaService, ProductoService, MineroService, AdministradorService, UsuarioService, JwtService],
  controllers: [VentaController, SalidaVentaController, ReportesVentasController]
})
export class VentaModule {}
