import { Module } from '@nestjs/common';
import { CompraController } from './compra.controller';
import { CompraService } from './compra.service';

@Module({
  controllers: [CompraController],
  providers: [CompraService]
})
export class CompraModule {}
