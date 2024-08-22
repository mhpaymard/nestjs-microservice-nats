import { Body, Controller, Get, Post, Req, UseFilters, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { SwaggerConsumes } from "@app/common/enums/swagger-consumes.enum";
import { CheckOtpDto, SendOtpDto } from "@app/common/user/dto/auth.dto";
import { JwtAuthGuard } from "@app/common/user/guards/jwt-auth.guard";
import { Request } from "express";

@Controller("user")
@ApiTags("User")
export class UserController{
    constructor(private userService:UserService){}

    @Post("/send-otp")
    @ApiConsumes(SwaggerConsumes.UrlEncoded,SwaggerConsumes.Json)
    sendOtp(@Body() sendOtpDto:SendOtpDto){
        return this.userService.sendToNats({cmd:"send-otp"},sendOtpDto);
    }

    @Post("/check-otp")
    @ApiConsumes(SwaggerConsumes.UrlEncoded,SwaggerConsumes.Json)
    checkOtp(@Body() checkOtpDto:CheckOtpDto){
        return this.userService.sendToNats({cmd:"check-otp"},checkOtpDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/profile")
    @ApiBearerAuth('authorization')
    getProfile(@Req() request:Request){
        return this.userService.sendToNats({cmd:"get-profile"},{token:request.token});
    }

}