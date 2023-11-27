import { Module } from '@nestjs/common';
import { MineroController } from './minero.controller';
import { MineroService } from './minero.service';

@Module({
  controllers: [MineroController],
  providers: [MineroService]
})
export class MineroModule {}
