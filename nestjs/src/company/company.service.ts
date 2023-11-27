import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { User } from '../user/user.entity';
import { validate } from 'class-validator';
import { GetCompaniesDto } from './dto/get-companies.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAll(
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
