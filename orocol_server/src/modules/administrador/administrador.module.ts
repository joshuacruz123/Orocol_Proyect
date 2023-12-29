import { Module } from '@nestjs/common';
import { AdministradorService } from './administrador.service';
import { AdministradorController } from './administrador.controller';

@Module({
  providers: [AdministradorService],
  controllers: [AdministradorController]
})
export class AdministradorModule {}
