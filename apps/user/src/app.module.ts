import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfig } from "./config/typeorm.config";
import { UserModule } from "./user/user.module";
import { ConfigModule } from "@nestjs/config";
import { join } from "path";

@Module({
    imports:[
        ConfigModule.forRoot({
            envFilePath:join(process.cwd(),".env"),
            isGlobal:true
        }),
        TypeOrmModule.forRoot(TypeOrmConfig()),
        UserModule
    ],
    controllers:[],
    providers:[]
})
export class AppModule{}