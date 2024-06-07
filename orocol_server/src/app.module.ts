import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './config/constants';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { RolModule } from './modules/rol/rol.module';
import { AdministradorModule } from './modules/administrador/administrador.module';
import { MineroModule } from './modules/minero/minero.module';
import { NovedadModule } from './modules/novedad/novedad.module';
import { VentaModule } from './modules/venta/venta.module';
import { ProductoModule } from './modules/producto/producto.module';
import { CompraModule } from './modules/compra/compra.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MailService } from './mail/mail.service';
import { BackupService } from './config/backup/backup.service';
import { ScheduleModule } from '@nestjs/schedule';
import * as fs from 'fs';

const UPLOADS_FOLDER = './uploads';

// Verificar si la carpeta de subidas existe, si no existe, crearla
if (!fs.existsSync(UPLOADS_FOLDER)) {
  fs.mkdirSync(UPLOADS_FOLDER);
}

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Ruta a la carpeta de archivos estáticos
      serveRoot: '/uploads', // Ruta base para servir los archivos estáticos
    }),
    MulterModule.register({
      dest: './uploads', // Carpeta donde se guardarán los archivos subidos 
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // 'mysql'
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
    UsuarioModule, RolModule, AdministradorModule, MineroModule, NovedadModule, VentaModule, ProductoModule, CompraModule,
    ScheduleModule.forRoot(), // ScheduleModule para crear el backup
  ],
  //Importa todos los módulos 
  controllers: [AppController],
  providers: [MailService, BackupService], // Servicio de correos y servicio de backups
})
export class AppModule { }
