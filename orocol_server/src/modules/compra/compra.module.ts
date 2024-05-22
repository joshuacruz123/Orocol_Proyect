import { Module } from '@nestjs/common';
import { CompraService } from './compra.service';
import { CompraController } from './compra.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from './cliente.entity';
import { VentaModule } from '../venta/venta.module';
import { ProductoModule } from '../producto/producto.module';
import { MineroModule } from '../minero/minero.module';
import { AdministradorModule } from '../administrador/administrador.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { MineroService } from '../minero/minero.service';
import { ProductoService } from '../producto/producto.service';
import { UsuarioService } from '../usuario/usuario.service';
import { AdministradorService } from '../administrador/administrador.service';
import { VentaService } from '../venta/venta.service';
import { EntradaVentaEntity } from '../venta/entradaventas.entity';
import { SalidaVentaEntity } from '../venta/salidaventas.entity';
import { ProductoEntity } from '../producto/producto.entity';
import { MineroEntity } from '../minero/minero.entity';
import { AdministradorEntity } from '../administrador/administrador.entity';
import { JwtService } from '@nestjs/jwt';
import { RolEntity } from '../rol/rol.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { TurnoMineroEntity } from '../minero/turno.entity';
import { PerfilEntity } from '../usuario/perfil.entity';
import { SolicitudEntity } from '../usuario/solicitud.entity';
import { IndicadoresCompraController } from './indicadores_compra.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteEntity, EntradaVentaEntity, SalidaVentaEntity, ProductoEntity, MineroEntity, TurnoMineroEntity, AdministradorEntity, RolEntity, UsuarioEntity, PerfilEntity, SolicitudEntity]),
  VentaModule, ProductoModule, MineroModule, AdministradorModule, UsuarioModule,
  ],
  providers: [CompraService, VentaService, ProductoService, MineroService, AdministradorService, UsuarioService, JwtService],
  controllers: [CompraController, IndicadoresCompraController]
})
export class CompraModule {} 
