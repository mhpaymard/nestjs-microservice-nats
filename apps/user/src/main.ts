import { NestFactory } from '@nestjs/core';
import { NatsMicroserviceConfig } from './config/nats-microservice.config';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,NatsMicroserviceConfig());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
  console.log("User-microservice is running");
}
bootstrap();
