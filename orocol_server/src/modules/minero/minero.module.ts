import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MineroService } from './minero.service';
import { MineroController } from './minero.controller';
import { Minero } from './minero.entity';
import { TurnoMinero } from './turno.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Minero, TurnoMinero])],
  providers: [MineroService],
  controllers: [MineroController]
})
export class MineroModule {}
 