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
        synchronize: false, //"true" para reestructurar y agregar tablas a la base de datos 
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

/*
nest new orocol_server

npm i --save @nestjs/config
npm install --save @nestjs/typeorm typeorm mysql2
npm i class-validator class-transformer

npm i @nestjs/passport passport passport-local
npm i @types/passport-local -D
npm i @nestjs/jwt passport-jwt
npm i @types/passport-jwt

# development --------
$ npm run start 
# watch mode ---------
$ npm run start:dev
# production mode ----
$ npm run start:prod

usuario rol administrador minero novedad venta producto compra auth
nest g module modules/
nest g service modules/ --no-spec
nest g controller modules/ --no-spec
.entity.ts
.repository.ts
.dto.ts

*/

/* 
Endpoints:
http://localhost:8080/usuario

http://localhost:8080/rol

http://localhost:8080/administrador

http://localhost:8080/minero

http://localhost:8080/novedad

http://localhost:8080/producto
http://localhost:8080/producto/2

http://localhost:8080/venta

http://localhost:8080/compra

*/