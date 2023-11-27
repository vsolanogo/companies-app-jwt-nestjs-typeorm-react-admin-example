import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @IsString()
  phoneNumber: string;

  @MinLength(1)
  @IsString()
  lastName: string;

  @MinLength(1)
  @IsString()
  firstName: string;

  @IsString()
  nickName: string;

  @IsString()
  description: string;

  @IsString()
  position: string;
}
