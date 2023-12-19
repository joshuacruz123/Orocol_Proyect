import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './config/constants';
import { UsuarioModule } from './usuario/usuario.module';
import { RolModule } from './rol/rol.module';
import { AdministradorModule } from './administrador/administrador.module';
import { MineroModule } from './minero/minero.module';
import { CompraModule } from './compra/compra.module';
import { NovedadModule } from './novedad/novedad.module';
import { ProductoModule } from './producto/producto.module';
import { VentaModule } from './venta/venta.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>(DB_HOST),
        port: +configService.get<number>(DB_PORT),
        username: configService.get<string>(DB_USER),
        password: configService.get<string>(DB_PASSWORD),
        database: configService.get<string>(DB_DATABASE),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: false //true
      }),
      inject: [ConfigService],
      //CREATE DATABASE IF NOT exists orocol character SET utf8 collate utf8_general_ci;
    }),
    UsuarioModule,
    RolModule,
    AdministradorModule,
    MineroModule,
    CompraModule,
    NovedadModule,
    ProductoModule,
    VentaModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
