import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AdministradorModule } from './administrador/administrador.module';
import { MineroModule } from './minero/minero.module';
import { VentaModule } from './venta/venta.module';
import { ProductoModule } from './producto/producto.module';
import { CompraModule } from './compra/compra.module';
import { NovedadModule } from './novedad/novedad.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'orocol',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    //Usamos la libreria TypeOrm para gestionar nuestra DB
    UsuariosModule,
    AdministradorModule,
    MineroModule,
    VentaModule,
    ProductoModule,
    CompraModule,
    NovedadModule],
    //Modulos del sistema
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
