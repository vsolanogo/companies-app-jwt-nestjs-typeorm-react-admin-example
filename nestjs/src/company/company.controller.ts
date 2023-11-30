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
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CompanyService } from './company.service';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyDto } from './dto/company.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { GetCompaniesDto } from './dto/get-companies.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Role } from '../models/models';
import { HasRoles } from '../auth/has-roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

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
      req?.user?.roles?.includes(Role.Admin),
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
  @Patch('company')
  async updateCompany(
    @Body() body: UpdateCompanyDto,
    @Request() req,
  ): Promise<Company> {
    return await this.companyService.updateCompany(
      body,
      req?.user?.id,
      req?.user?.roles?.includes(Role.Admin),
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

  @UseGuards(JwtAuthGuard)
  @Delete('company/:id')
  @HttpCode(204)
  async deleteCompany(
    @Param('id') companyId: string,
    @Request() req,
  ): Promise<void> {
    return await this.companyService.deleteCompany(
      companyId,
      req?.user?.id,
      req?.user?.roles?.includes(Role.Admin),
    );
  }

  @Serialize(CompanyDto)
  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('company/list')
  async getAllUsers(
    @Body() body: GetCompaniesDto,
    @Request() req,
  ): Promise<Company[]> {
    return this.companyService.getAllUserCompanies(body, req?.user?.id, true);
  }
}
