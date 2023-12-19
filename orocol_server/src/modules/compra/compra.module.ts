import { Module } from '@nestjs/common';
import { CompraService } from './compra.service';
import { CompraController } from './compra.controller';

@Module({
  providers: [CompraService],
  controllers: [CompraController]
})
export class CompraModule {}
