import { IsString, IsInt } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  serviceOfActivity: string;

  @IsInt()
  numberOfEmployees: number;

  @IsString()
  description: string;

  @IsString()
  type: string;
}
