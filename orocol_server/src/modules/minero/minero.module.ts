import { Module } from '@nestjs/common';
import { MineroService } from './minero.service';
import { MineroController } from './minero.controller';

@Module({
  providers: [MineroService],
  controllers: [MineroController]
})
export class MineroModule {}
