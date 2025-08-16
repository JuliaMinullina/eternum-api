import { UserRole } from '../user.entity';

export interface UserWithoutPassword {
  UserID: string;
  Role: UserRole;
  UserName: string;
  UserSurname: string;
  Email: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
