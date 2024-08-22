import { EntityName } from "@app/common/enums/entity.enum";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { BaseEntity } from "../abstracts/base.entity";

@Entity(EntityName.Otp)
export class OtpEntity extends BaseEntity{
    @Column()
    code:string;
    @Column()
    expires_in:Date;
    @Column()
    user_id:number;
    @OneToOne(()=>UserEntity,user=>user.otp,{onDelete:"CASCADE"})
    @JoinColumn({name:"user_id"})
    user:UserEntity;
}