import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Te damos la bienvenida a el servidor de Orocol!';
  }
}
