import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './config/constants';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { RolModule } from './modules/rol/rol.module';
import { AdministradorModule } from './modules/administrador/administrador.module';
import { MineroModule } from './modules/minero/minero.module';
import { CompraModule } from './modules/compra/compra.module';
import { NovedadModule } from './modules/novedad/novedad.module';
import { ProductoModule } from './modules/producto/producto.module';
import { VentaModule } from './modules/venta/venta.module';
import { AuthModule } from './auth/auth.module';

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
        synchronize: false,
        logging: false //"true" para ver las sentencias SQL por consola
      }),
      inject: [ConfigService],
      // Conexión a la base de datos con TypeOrm 
    }),
    UsuarioModule,
    RolModule,
    AdministradorModule,
    MineroModule,
    CompraModule,
    NovedadModule,
    ProductoModule,
    VentaModule,
    AuthModule, 
    //Importa todos los módulos   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
