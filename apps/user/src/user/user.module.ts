import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/common/user/entities/user.entity';
import { OtpEntity } from '@app/common/user/entities/otp.entity';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity,OtpEntity])
  ],
  controllers: [UserController],
  providers: [
    JwtService,
    TokenService,
    AuthService,
    UserService,
  ],
})
export class UserModule {}
