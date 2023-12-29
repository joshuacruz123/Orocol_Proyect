import { Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';

@Module({
  providers: [RolService],
  controllers: [RolController]
})
export class RolModule {}
