import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfigInit } from './config/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import { RpcExceptionFilter } from '@app/common/filter/rpc-to-http-exception.filter';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new RpcExceptionFilter());
  SwaggerConfigInit(app);
  await app.listen(PORT,()=>{
    console.log(`Gateway Running On Port ${PORT}`);
    console.log(`>> http://localhost:${PORT}/swagger`);
  });
}
bootstrap();
