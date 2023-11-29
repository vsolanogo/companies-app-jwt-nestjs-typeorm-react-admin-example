import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  id: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  lastName: string;

  @IsString()
  firstName: string;

  @IsString()
  description: string;

  @IsString()
  position: string;
}
