import { Expose, Type } from 'class-transformer';
import { UserDto } from '../../user/dto/user.dto';

export class CompanyDto {
  @Expose()
  id: string;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;

  @Expose()
  name: string;

  @Expose()
  address: string;

  @Expose()
  serviceOfActivity: string;

  @Expose()
  numberOfEmployees: number;

  @Expose()
  description: string;

  @Expose()
  type: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
