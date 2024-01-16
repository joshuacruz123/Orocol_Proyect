import { Module } from '@nestjs/common';
import { CompraService } from './compra.service';
import { CompraController } from './compra.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from './cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteEntity])],
  providers: [CompraService],
  controllers: [CompraController]
})
export class CompraModule {}
