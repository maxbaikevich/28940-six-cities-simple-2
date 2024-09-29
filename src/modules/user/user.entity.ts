
import { UserRole } from '../../types/user.type.enum.js';
import {User} from '../../types/user.type.js';
import typegoose, {getModelForClass, defaultClasses} from '@typegoose/typegoose';
import {createSHA256} from '../../utils/common.js';

const {prop, modelOptions} = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})

export class UserEntity extends defaultClasses.TimeStamps implements User {

  constructor(data: User) {
    super();

    this.name = data.name;
    this.email = data.email;
    this.avatar= data.avatar;
    this.password = data.password;
    this.userType = data.userType;
  }

  @prop({required: true, default: ''})
  public name!: string;

  @prop({unique: true, required: true})
  public email!: string;

  @prop({required: true, default: ''})
  public avatar!: string;

  @prop({required: true, default: ''})
  public  password!: string;

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  @prop({required: true, default: ''})
  public userType!:  UserRole;
}

export const UserModel = getModelForClass(UserEntity);
