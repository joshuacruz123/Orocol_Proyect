import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {

  @ApiTags('Orocol')
  @Get()
  getHello(): string {
    return 'Te damos la bienvenida al servidor de Orocol!';
  }
}
 