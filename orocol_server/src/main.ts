import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SERVER_PORT } from './config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  //Puerto del servidor
  const port = +configService.get<number>(SERVER_PORT) || 3000;
  await app.listen(port);
  console.log(`Estamos en el puerto ${await app.getUrl()}`)
}
bootstrap();

/*
nest g module modules/
nest g service modules/ --no-spec
nest g controller modules/ --no-spec
.entity.ts
.repository.ts
.dto.ts
 
npm run start:dev

npm i --save @nestjs/config 
npm i class-validator class-transformer

npm i @nestjs/passport passport passport-local
npm i @types/passport-local -D
npm i @nestjs/jwt passport-jwt
npm i @types/passport-jwt
*/