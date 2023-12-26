import { Module } from '@nestjs/common';
import { AdministradorService } from './administrador.service';
import { AdministradorController } from './administrador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrador } from './administrador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Administrador])],
  providers: [AdministradorService],
  controllers: [AdministradorController]
})
export class AdministradorModule {}
