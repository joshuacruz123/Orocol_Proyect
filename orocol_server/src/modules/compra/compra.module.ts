import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CompraService } from './compra.service';
import { CompraController } from './compra.controller';
import { Cliente } from './cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])],
  providers: [CompraService],
  controllers: [CompraController]
})
export class CompraModule {}
 