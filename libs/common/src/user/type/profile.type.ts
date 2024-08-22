import { UserEntity } from "../entities/user.entity"

export type GetProfilePayload={
    user:UserEntity;
    token:string;
}