import { UserRole } from './user.type.enum.js';
export type User = {
  name: string;
  email: string;
  avatar: string;
  password: string;
  userType: UserRole;
}
