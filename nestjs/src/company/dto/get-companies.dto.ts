import { IsInt, IsOptional, Min, IsIn, IsString } from 'class-validator';

export class GetCompaniesDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsString()
  @IsIn(['name', 'serviceOfActivity'], { each: true })
  sortBy?: 'name' | 'serviceOfActivity';

  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';
}
