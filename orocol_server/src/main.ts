import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SERVER_PORT, SERVER_PORT_ONE } from './config/constants';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  const port = +configService.get<number>(SERVER_PORT) || (SERVER_PORT_ONE);
  // Documentar API
  const options = new DocumentBuilder()
    .setTitle('API Orocol')
    .setDescription('Documentación de la API rest para el manejo de procesos de Orocol')
    .setVersion('2.4')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('documentacion', app, document)

  //Puerto del servidor
  await app.listen(port);
  console.log(`Estamos en el puerto ${await app.getUrl()}`)
}
bootstrap();
