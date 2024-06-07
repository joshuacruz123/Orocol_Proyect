import { Module } from '@nestjs/common';
import { CompraService } from './compra.service';
import { CompraController } from './compra.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from 'src/entities/cliente.entity';
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
import { EntradaVentaEntity } from 'src/entities/entradaventas.entity';
import { SalidaVentaEntity } from 'src/entities/salidaventas.entity';
import { ProductoEntity } from 'src/entities/producto.entity';
import { MineroEntity } from 'src/entities/minero.entity';
import { AdministradorEntity } from 'src/entities/administrador.entity';
import { JwtService } from '@nestjs/jwt';
import { RolEntity } from 'src/entities/rol.entity';
import { UsuarioEntity } from 'src/entities/usuario.entity';
import { TurnoMineroEntity } from 'src/entities/turno.entity';
import { PerfilEntity } from 'src/entities/perfil.entity';
import { SolicitudEntity } from 'src/entities/solicitud.entity';
import { IndicadoresCompraController } from './indicadores_compra.controller';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteEntity, EntradaVentaEntity, SalidaVentaEntity, ProductoEntity, MineroEntity, TurnoMineroEntity, AdministradorEntity, RolEntity, UsuarioEntity, PerfilEntity, SolicitudEntity]),
  VentaModule, ProductoModule, MineroModule, AdministradorModule, UsuarioModule,
  ],
  providers: [CompraService, VentaService, ProductoService, MineroService, AdministradorService, UsuarioService, JwtService, MailService],
  controllers: [CompraController, IndicadoresCompraController]
})
export class CompraModule {} 
