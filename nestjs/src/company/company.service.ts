import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { User } from '../user/user.entity';
import { validate } from 'class-validator';
import { GetCompaniesDto } from './dto/get-companies.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async updateCompany(
    companyDto: UpdateCompanyDto,
    userId: string,
    isAdmin: boolean,
  ): Promise<Company> {
    const modifiedCompany = await this.companyRepository.findOne({
      relations: ['user'],
      where: { id: companyDto.id },
    });

    const userPatcher = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!userPatcher) {
      throw new BadRequestException('User not found');
    }

    if (!modifiedCompany) {
      throw new BadRequestException('Company not found');
    }

    if (!isAdmin && modifiedCompany.user.id !== userId) {
      throw new ForbiddenException(
        'You do not have permission to get this entity',
      );
    }

    modifiedCompany.name = companyDto.name;
    modifiedCompany.address = companyDto.address;
    modifiedCompany.serviceOfActivity = companyDto.serviceOfActivity;
    modifiedCompany.numberOfEmployees = companyDto.numberOfEmployees;
    modifiedCompany.description = companyDto.description;
    modifiedCompany.type = companyDto.type;

    return this.companyRepository.save(modifiedCompany);
  }

  async getById(
    companyId: string,
    userId: string,
    isAdmin: boolean,
  ): Promise<Company> {
    const company = await this.companyRepository.findOne({
      relations: ['user'],
      where: { id: companyId },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    if (isAdmin || company.user.id === userId) {
      return company;
    }

    throw new ForbiddenException(
      'You do not have permission to get this entity',
    );
  }

  async getAllUserCompanies(
    getCompaniesDto: GetCompaniesDto,
    userId: string,
  ): Promise<Company[]> {
    const { page = 1, limit = 10, sortBy, sortOrder } = getCompaniesDto;
    const skip = (page - 1) * limit;

    const validSortBy = ['name', 'serviceOfActivity'].includes(sortBy)
      ? sortBy
      : 'name';
    const validSortOrder = sortOrder?.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

    const order = {
      [validSortBy]: validSortOrder,
    };

    // *Сортировка должна происходить на серверной
    // стороне по Name, Service полям*.
    const companies = await this.companyRepository.find({
      where: { user: { id: userId } },
      // skip,
      // take: limit,
      order,
    });

    return companies;
  }

  async create(
    createCompanyDto: CreateCompanyDto,
    userId: string,
  ): Promise<Company> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newCompany = new Company();
    newCompany.user = user;
    newCompany.name = createCompanyDto.name;
    newCompany.address = createCompanyDto.address;
    newCompany.serviceOfActivity = createCompanyDto.serviceOfActivity;
    newCompany.numberOfEmployees = createCompanyDto.numberOfEmployees;
    newCompany.description = createCompanyDto.description;
    newCompany.type = createCompanyDto.type;

    const errors = await validate(newCompany);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return this.companyRepository.save(newCompany).catch((e) => {
      throw new BadRequestException('Failed to save company');
    });
  }
}
