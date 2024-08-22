import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "../abstracts/base.entity";
import { EntityName } from "@app/common/enums/entity.enum";
import { OtpEntity } from "./otp.entity";

@Entity(EntityName.User)
export class UserEntity extends BaseEntity{
    @Column({unique:true})
    phone:string;
    @Column({default:false})
    mobile_verify:boolean;
    @Column({nullable:true})
    first_name:string;
    @Column({nullable:true})
    last_name:string;
    @Column({nullable:true})
    otp_id:number;
    @OneToOne(()=>OtpEntity,otp=>otp.user,{nullable:true})
    @JoinColumn({name:"otp_id"})
    otp:OtpEntity;
}