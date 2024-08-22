import { OtpEntity } from "@app/common/user/entities/otp.entity";
import { UserEntity } from "@app/common/user/entities/user.entity";
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CheckOtpDto, SendOtpDto } from "@app/common/user/dto/auth.dto";
import { AuthMessage, PublicMessages } from "@app/common/enums/messages.enum";
import { randomInt } from "crypto";
import { TokenService } from "./token.service";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class AuthService{
    constructor(
        @InjectRepository(UserEntity) private userRepository:Repository<UserEntity>,
        @InjectRepository(OtpEntity) private otpRepository:Repository<OtpEntity>,
        private tokenService:TokenService
    ){}
    async sendOtp(otpDto:SendOtpDto){
        const {phone} = otpDto;
        let user = await this.userRepository.findOneBy({phone});
        if(!user){
            user = this.userRepository.create({
                phone
            });
            user = await this.userRepository.save(user);
        }
        const {code} = await this.makeOtpForUser(user);
        return {
            message:PublicMessages.SendOtp,
            code
        }
    }
    async checkOtp(otpDto:CheckOtpDto){
        const {code, phone} = otpDto;
        const user = await this.userRepository.findOne(
            {
                where:{phone},
                relations:{
                    otp:true
                }
            }
        )
        if(!user || !user?.otp) throw new RpcException(new UnauthorizedException(AuthMessage.TryAgain));
        if(user?.otp?.expires_in < (new Date()) ) throw new RpcException(new BadRequestException(AuthMessage.ExpiredOtpCode));
        if(user?.otp?.code !== code) throw new RpcException(new BadRequestException(AuthMessage.WrongOtpCode));
        if(!user?.mobile_verify) await this.userRepository.update({id:user.id},{mobile_verify:true});
        const {accessToken,refreshToken} = this.tokenService.makeTokens({id:user.id,phone:user.phone});
        return {
            message:PublicMessages.LoggedIn,
            accessToken,
            refreshToken
        }
    }
    async makeOtpForUser(user:UserEntity){
        const code = randomInt(10000,99999).toString();
        const expires_in = new Date(Date.now() + (3 * 60 * 1000)) //3 minutes for expiring
        let otp = await this.otpRepository.findOneBy({user_id:user.id});
        if(otp){
            otp.code = code;
            otp.expires_in = expires_in;
        }else{
            otp = this.otpRepository.create({
                user_id:user.id,
                code,
                expires_in
            })
        }
        otp = await this.otpRepository.save(otp);
        await this.userRepository.update(
            {id:user.id},
            {otp_id:otp.id}
        );
        return {
            code
        }
    }
    async validateAccessToken(token:string):Promise<UserEntity>{
        const {id,phone} = this.tokenService.verifyAccessToken(token);
        const user = await this.userRepository.findOneBy({id});
        if(!user) throw new RpcException(new UnauthorizedException(AuthMessage.LoginAgain));
        return user;
    }
}