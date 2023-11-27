import { Module } from '@nestjs/common';
import { ModuleService } from './module/module.service';
import { NovedadController } from './novedad.controller';
import { NovedadService } from './novedad.service';

@Module({
  providers: [ModuleService, NovedadService],
  controllers: [NovedadController]
})
export class NovedadModule {}
