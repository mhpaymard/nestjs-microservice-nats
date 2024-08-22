import { MicroserviceOptions, Transport } from "@nestjs/microservices";

export function NatsMicroserviceConfig():MicroserviceOptions{
    return {
        transport: Transport.NATS,
        options:{
            servers:[
                process.env.NATS_HOST
            ]
        }
    }
}