import { Module } from '@nestjs/common';
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntradaVentaEntity } from 'src/entities/entradaventas.entity';
import { SalidaVentaEntity } from 'src/entities/salidaventas.entity';
import { ProductoModule } from '../producto/producto.module';
import { MineroModule } from '../minero/minero.module';
import { AdministradorModule } from '../administrador/administrador.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { MineroService } from '../minero/minero.service';
import { ProductoService } from '../producto/producto.service';
import { UsuarioService } from '../usuario/usuario.service';
import { ProductoEntity } from 'src/entities/producto.entity';
import { MineroEntity } from 'src/entities/minero.entity';
import { UsuarioEntity } from 'src/entities/usuario.entity';
import { AdministradorEntity } from 'src/entities/administrador.entity';
import { AdministradorService } from '../administrador/administrador.service';
import { RolEntity } from 'src/entities/rol.entity';
import { JwtService } from '@nestjs/jwt';
import { TurnoMineroEntity } from 'src/entities/turno.entity';
import { SalidaVentaController } from './salidaventa.controller';
import { ReportesVentasController } from './reporteventa.controller';
import { PerfilEntity } from 'src/entities/perfil.entity';
import { SolicitudEntity } from 'src/entities/solicitud.entity';
import { IndicadoresVentasController } from './indicadores_ventas.controller';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([EntradaVentaEntity, SalidaVentaEntity, ProductoEntity, MineroEntity, TurnoMineroEntity, AdministradorEntity, RolEntity, UsuarioEntity, PerfilEntity, SolicitudEntity]),
  ProductoModule, MineroModule, AdministradorModule, UsuarioModule,
  ],
  providers: [VentaService, ProductoService, MineroService, AdministradorService, UsuarioService, JwtService, MailService],
  controllers: [VentaController, SalidaVentaController, ReportesVentasController, IndicadoresVentasController]
})
export class VentaModule {}
