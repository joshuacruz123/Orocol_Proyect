import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RolModule } from '../rol/rol.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { MineroService } from './minero.service';
import { MineroController } from './minero.controller';
import { Minero } from './minero.entity';
import { TurnoMinero } from './turno.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Minero, TurnoMinero]),
    RolModule, UsuarioModule,
  ],
  providers: [MineroService],
  controllers: [MineroController]
})
export class MineroModule {}
  