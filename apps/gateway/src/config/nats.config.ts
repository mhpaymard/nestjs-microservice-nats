import { ServicesName } from "@app/common/enums/services.enum";
import { ClientsModuleAsyncOptions, Transport } from "@nestjs/microservices";

export function NatsConfig():ClientsModuleAsyncOptions{
    return {
        isGlobal:true,
        clients:[
          {
            name:ServicesName.NATS_SERVICE,
            useFactory:()=>({
              transport : Transport.NATS,
              options:{
                servers:[
                  process.env.NATS_HOST
                ]
              }
            })
          }
        ]
    }
}