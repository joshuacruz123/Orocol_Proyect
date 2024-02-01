import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  getHello(): string {
    return 'Te damos la bienvenida a el servidor de Orocol!';
  }
}
 