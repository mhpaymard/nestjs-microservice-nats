import { AuthMessage } from "@app/common/enums/messages.enum";
import { TTokensPayload } from "@app/common/user/type/tokens-payload.type";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RpcException } from "@nestjs/microservices";


@Injectable()
export class TokenService{
    constructor(
        private jwtService:JwtService
    ){}
    makeTokens(payload:TTokensPayload){
        const accessToken = this.createAccessToken(payload);
        const refreshToken = this.createRefreshToken(payload);
        return {accessToken,refreshToken};
    }
    createAccessToken(payload:TTokensPayload){
        const accessToken = this.jwtService.sign(payload,{
            expiresIn: process.env.ACCESS_TOKEN_EXPIRITION.toString(),
            secret:process.env.ACCESS_TOKEN_SECRET
        });
        return accessToken;
    }
    createRefreshToken(payload:TTokensPayload){
        const refreshToken = this.jwtService.sign(payload,{
            expiresIn: process.env.REFRESH_TOKEN_EXPIRITION.toString(),
            secret:process.env.REFRESH_TOKEN_SECRET
        });
        return refreshToken;
    }
    verifyAccessToken(token: string): TTokensPayload {
        try {
            return this.jwtService.verify(token, {
                secret: process.env.ACCESS_TOKEN_SECRET,
            });
        } catch (error) {
            throw new RpcException(new UnauthorizedException(AuthMessage.LoginAgain));
        }
    }
}