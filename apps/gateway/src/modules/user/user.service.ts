import { ServicesName } from "@app/common/enums/services.enum";
import { CommandType } from "@app/common/types/command.type";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError, lastValueFrom, throwError } from "rxjs";

@Injectable()
export class UserService{
    constructor(
        @Inject(ServicesName.NATS_SERVICE) private natsClient:ClientProxy
    ){}
    sendToNats(cmd:CommandType,data:any){
        return this.natsClient.send(cmd,data).pipe(catchError(error => throwError(() => new RpcException(error.response))));
    }
    async lastValueSendToNats(cmd:CommandType,data:any){
        try{
            const result = await lastValueFrom(
                this.natsClient.send(cmd,data)
            )
            return result;
        }catch(error){
            throw error;
        }
    }
}