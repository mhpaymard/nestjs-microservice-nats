import { AuthMessage } from "@app/common/enums/messages.enum";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { isJWT } from "class-validator";
import { Request } from "express";
import { UserEntity } from "../entities/user.entity";

declare global{
    namespace Express{
        interface Request{
            token?:string;
            user?:UserEntity;
        }
    }
}

@Injectable()
export class JwtAuthGuard implements CanActivate{
    constructor(
    ){}
    async canActivate(context: ExecutionContext){
        if(context.getType() === "http"){
            const httpContext = context.switchToHttp();
            const httpRequest = httpContext.getRequest<Request>();
            const token = await this.extractTokenHttp(httpRequest);
            httpRequest.token = token;
            return true;
        }
        throw new UnauthorizedException(AuthMessage.LoginRequired)
    }
    private extractTokenHttp(httpRequest:Request):string{
        const {authorization} = httpRequest.headers;
        if(!authorization || authorization?.trim()=="") throw new UnauthorizedException(AuthMessage.LoginRequired)
        const [bearer,token] = authorization?.split(" ");
        if(bearer?.toLowerCase()!=="bearer" || !token || !isJWT(token)) throw new UnauthorizedException(AuthMessage.LoginRequired)
        return token;
    }
}