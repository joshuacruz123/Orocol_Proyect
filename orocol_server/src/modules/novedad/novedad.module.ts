import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { NovedadService } from './novedad.service';
import { NovedadController } from './novedad.controller';
import { Novedad } from './novedad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Novedad])],
  providers: [NovedadService],
  controllers: [NovedadController]
})
export class NovedadModule {}
 