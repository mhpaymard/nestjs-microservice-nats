import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { SwaggerModule } from '@nestjs/swagger';
import { NatsConfig } from './config/nats.config';
import { UserModule } from './modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:join(process.cwd(),".env"),
      isGlobal:true
    }),
    ClientsModule.registerAsync(NatsConfig()),
    SwaggerModule,
    JwtModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
