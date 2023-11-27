import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateCompanyDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  serviceOfActivity?: string;

  @IsInt()
  @IsOptional()
  numberOfEmployees?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  type?: string;
}
