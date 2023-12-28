import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MineroModule } from '../minero/minero.module';
import { RolModule } from '../rol/rol.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { NovedadService } from './novedad.service';
import { NovedadController } from './novedad.controller';
import { Novedad } from './novedad.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Novedad]),
    MineroModule, RolModule, UsuarioModule
  ],
  providers: [NovedadService],
  controllers: [NovedadController]
})
export class NovedadModule {}
 