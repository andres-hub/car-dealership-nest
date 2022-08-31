import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function main() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes( new ValidationPipe({
    // Elimina la data basura
    whitelist:true,
    // Saca error si envia mas data 
    forbidNonWhitelisted: true
  }))
  await app.listen(3000);
}
main();
