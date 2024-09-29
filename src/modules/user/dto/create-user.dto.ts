import { UserRole } from '../../../types/user.type.enum';
export default class CreateUserDto {
  public name!: string;
  public email!: string;
  public avatar!: string;
  public password!: string;
  public userType!: UserRole;
}
