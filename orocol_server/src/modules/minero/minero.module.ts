import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MineroService } from './minero.service';
import { MineroController } from './minero.controller';
import { MineroEntity } from './minero.entity';
import { TurnoMineroEntity } from './turno.entity';
import { RolEntity } from '../rol/rol.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { RolModule } from '../rol/rol.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { RolService } from '../rol/rol.service';
import { UsuarioService } from '../usuario/usuario.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MineroEntity, TurnoMineroEntity, RolEntity, UsuarioEntity]),
    RolModule, UsuarioModule,
  ],
  providers: [MineroService, RolService, UsuarioService],
  controllers: [MineroController]
})
export class MineroModule {}
