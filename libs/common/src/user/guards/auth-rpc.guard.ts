import { AuthMessage } from "@app/common/enums/messages.enum";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "apps/user/src/user/auth.service";
import { isJWT } from "class-validator";
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
export class AuthRpcGuard implements CanActivate{
    constructor(
        private authService:AuthService
    ){}
    async canActivate(context: ExecutionContext) {
        if(context.getType() === "rpc"){
            const rpcContext=context.switchToRpc();
            const rpcData = rpcContext.getData();
            const token = rpcData?.token;
            if(!token || !isJWT(token)) throw new UnauthorizedException(AuthMessage.LoginRequired);
            rpcData['user'] = await this.authService.validateAccessToken(token);
            return true;
        }
        throw new UnauthorizedException(AuthMessage.LoginRequired);
    }
}