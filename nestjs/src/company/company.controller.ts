import {
  Controller,
  Body,
  Post,
  Request,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CompanyService } from './company.service';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyDto } from './dto/company.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { GetCompaniesDto } from './dto/get-companies.dto';

@Controller()
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Serialize(CompanyDto)
  @UseGuards(JwtAuthGuard)
  @Post('company')
  async createCompany(
    @Body() body: CreateCompanyDto,
    @Request() req,
  ): Promise<Company> {
    return await this.companyService.create(body, req?.user?.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('companies')
  @HttpCode(200)
  async getCompanies(
    @Body() body: GetCompaniesDto,
    @Request() req,
  ): Promise<Company[]> {
    console.log({ body });
    return await this.companyService.getAll(body, req?.user?.id);
  }
}
