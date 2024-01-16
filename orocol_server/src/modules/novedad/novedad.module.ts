import { Module } from '@nestjs/common';
import { NovedadService } from './novedad.service';
import { NovedadController } from './novedad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NovedadEntity } from './novedad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NovedadEntity])],
  providers: [NovedadService],
  controllers: [NovedadController]
})
export class NovedadModule {}
