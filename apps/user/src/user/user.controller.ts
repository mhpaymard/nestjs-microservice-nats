import { Controller, UseFilters, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CheckOtpDto, SendOtpDto } from '@app/common/user/dto/auth.dto';
import { GetProfilePayload } from '@app/common/user/type/profile.type';
import { AuthService } from './auth.service';
import { AuthRpcGuard } from '@app/common/user/guards/auth-rpc.guard';

@Controller()
export class UserController {
    constructor(
        private userService: UserService,
        private authService: AuthService
    ) {}

    @MessagePattern({ cmd: "send-otp" })
    sendOtp(@Payload() otpDto: SendOtpDto){
        return this.authService.sendOtp(otpDto);
    }

    @MessagePattern({ cmd: "check-otp" })
    checkOtp(@Payload() otpDto:CheckOtpDto){
        return this.authService.checkOtp(otpDto);
    }

    @MessagePattern({ cmd: "get-profile" })
    @UseGuards(AuthRpcGuard)
    getProfile(@Payload() getProfilePayload: GetProfilePayload){
        return this.userService.getProfile(getProfilePayload);
    }
}
