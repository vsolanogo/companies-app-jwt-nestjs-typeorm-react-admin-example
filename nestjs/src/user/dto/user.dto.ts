import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  password: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  lastName: string;

  @Expose()
  firstName: string;

  @Expose()
  nickName: string;

  @Expose()
  description: string;

  @Expose()
  position: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
