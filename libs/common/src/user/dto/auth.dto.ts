import { BadRequestMessages } from "@app/common/enums/messages.enum";
import { ApiProperty } from "@nestjs/swagger";
import { IsMobilePhone, IsString, Length } from "class-validator";

export class SendOtpDto{
    @ApiProperty()
    @IsString()
    @IsMobilePhone("fa-IR",{},{message:BadRequestMessages.InValidPhone})
    phone:string;
}

export class CheckOtpDto{
    @ApiProperty()
    @IsString()
    @IsMobilePhone("fa-IR",{},{message:BadRequestMessages.InValidPhone})
    phone:string;

    @ApiProperty()
    @IsString()
    @Length(5,5,{message:BadRequestMessages.InValidCode})
    code:string;
}