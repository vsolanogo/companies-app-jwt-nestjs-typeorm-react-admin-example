import {
  Controller,
  Body,
  Post,
  Request,
  UseGuards,
  HttpCode,
  Param,
  Get,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CompanyService } from './company.service';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyDto } from './dto/company.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { GetCompaniesDto } from './dto/get-companies.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller()
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Serialize(CompanyDto)
  @UseGuards(JwtAuthGuard)
  @Get('company/:id')
  async getCompanyById(
    @Param('id') companyId: string,
    @Request() req,
  ): Promise<Company> {
    return await this.companyService.getById(
      companyId,
      req?.user?.id,
      req?.user?.admin,
    );
  }

  @Serialize(CompanyDto)
  @UseGuards(JwtAuthGuard)
  @Post('company')
  async createCompany(
    @Body() body: CreateCompanyDto,
    @Request() req,
  ): Promise<Company> {
    return await this.companyService.create(body, req?.user?.id);
  }

  @Serialize(CompanyDto)
  @UseGuards(JwtAuthGuard)
  @Patch('company/:id')
  async updateCompany(
    @Body() body: UpdateCompanyDto,
    @Request() req,
  ): Promise<Company> {
    return await this.companyService.updateCompany(
      body,
      req?.user?.id,
      req?.user?.admin,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('companies')
  @HttpCode(200)
  async getCompanies(
    @Body() body: GetCompaniesDto,
    @Request() req,
  ): Promise<Company[]> {
    return await this.companyService.getAllUserCompanies(body, req?.user?.id);
  }
}
