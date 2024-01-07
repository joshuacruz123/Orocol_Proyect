import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MineroService } from './minero.service';
import { MineroController } from './minero.controller';
import { Minero } from './minero.entity';
import { TurnoMinero } from './turno.entity';
import { Rol } from '../rol/rol.entity';
import { Usuario } from '../usuario/usuario.entity';
import { RolModule } from '../rol/rol.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { RolService } from '../rol/rol.service';
import { UsuarioService } from '../usuario/usuario.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Minero, TurnoMinero, Rol, Usuario]),
    RolModule, UsuarioModule,
  ],
  providers: [MineroService, RolService, UsuarioService],
  controllers: [MineroController]
})
export class MineroModule {}
