import { Injectable } from '@nestjs/common';
import { GetProfilePayload } from '@app/common/user/type/profile.type';

@Injectable()
export class UserService {
  constructor(
  ){}

  getProfile(getProfilePayload:GetProfilePayload){
    return getProfilePayload.user;
  }

}
