import { Module } from '@nestjs/common';
import { NovedadService } from './novedad.service';
import { NovedadController } from './novedad.controller';

@Module({
  providers: [NovedadService],
  controllers: [NovedadController]
})
export class NovedadModule {}
