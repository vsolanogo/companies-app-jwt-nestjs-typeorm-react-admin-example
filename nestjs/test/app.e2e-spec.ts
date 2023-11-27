import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { v4 as uuidv4 } from 'uuid';
import { SignupDto } from '../src/auth/dto/signup.dto';
import { SigninDto } from '../src/auth/dto/signin.dto';
import {
  randEmail,
  randPhoneNumber,
  randFirstName,
  randLastName,
  randUserName,
  randPassword,
  randProductCategory,
} from '@ngneat/falso';
import { faker } from '@faker-js/faker';
import { CreateCompanyDto } from 'src/company/dto/create-company.dto';

const generateRandomSignupDto = (): SignupDto => ({
  email: randEmail(),
  password: randPassword(),
  nickName: randUserName(),
  firstName: randFirstName(),
  lastName: randLastName(),
  phoneNumber: randPhoneNumber(),
  description: faker.lorem.sentence(),
  position: faker.lorem.sentence(),
});

const generateRandomCompanyDto = (): CreateCompanyDto => ({
  name: faker.company.buzzPhrase(),
  address: faker.location.streetAddress(),
  serviceOfActivity: faker.company.buzzNoun(),
  numberOfEmployees: faker.number.int({ min: 1, max: 100000 }),
  description: faker.lorem.sentence(),
  type: randProductCategory(),
});

describe('App Tests (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/signup (POST)', async () => {
    const signupDto: SignupDto = generateRandomSignupDto();

    const response = await request(app.getHttpServer())
      .post('/signup')
      .send(signupDto)
      .expect(HttpStatus.CREATED);

    expect(response.body.id).toBeDefined();
    expect(response.body.email).toBe(signupDto.email);

    expect(response.body.password).toBeUndefined();
  });

  it('/signup (POST) - User email already exists', async () => {
    const signupDto: SignupDto = generateRandomSignupDto();

    const response = await request(app.getHttpServer())
      .post('/signup')
      .send(signupDto)
      .expect(HttpStatus.CREATED);

    const responseForExisting = await request(app.getHttpServer())
      .post('/signup')
      .send(signupDto)
      .expect(HttpStatus.BAD_REQUEST);

    expect(responseForExisting.body.message).toBe(
      'User with given email already exists.',
    );
  });

  it('/signup (POST) - User nickName already exists', async () => {
    const signupDto: SignupDto = generateRandomSignupDto();

    const response = await request(app.getHttpServer())
      .post('/signup')
      .send(signupDto)
      .expect(HttpStatus.CREATED);

    const signupDtoSameNick: SignupDto = {
      ...generateRandomSignupDto(),
      nickName: signupDto.nickName,
    };

    const responseForExisting = await request(app.getHttpServer())
      .post('/signup')
      .send(signupDtoSameNick)
      .expect(HttpStatus.BAD_REQUEST);

    expect(responseForExisting.body.message).toBe(
      'User with given nickname already exists.',
    );
  });

  it('/signin (POST) - Successful signin', async () => {
    const signupDto: SignupDto = generateRandomSignupDto();

    const responseCreateUser = await request(app.getHttpServer())
      .post('/signup')
      .send(signupDto)
      .expect(HttpStatus.CREATED);

    const signinDto: SigninDto = {
      email: signupDto.email,
      password: signupDto.password,
    };

    const response = await request(app.getHttpServer())
      .post('/signin')
      .send(signinDto)
      .expect(HttpStatus.OK);

    expect(response.body.access_token).toBeDefined();

    const profileResponse = await request(app.getHttpServer())
      .get('/profile')
      .set('Authorization', `Bearer ${response.body.access_token}`)
      .expect(HttpStatus.OK);

    expect(profileResponse.body.id).toBeDefined();
    expect(profileResponse.body.email).toBe(signupDto.email);
  });

  it('/signin (POST) - Invalid credentials', async () => {
    const signinDto: SigninDto = {
      email: 'nonexistent@example.com',
      password: 'invalidpassword',
    };

    const response = await request(app.getHttpServer())
      .post('/signin')
      .send(signinDto)
      .expect(HttpStatus.UNAUTHORIZED);

    expect(response.body.message).toBe('Invalid credentials');
  });

  it('/profile (GET) - Successful profile retrieval', async () => {
    const signupDto: SignupDto = generateRandomSignupDto();

    const responseCreateUser = await request(app.getHttpServer())
      .post('/signup')
      .send(signupDto)
      .expect(HttpStatus.CREATED);

    const signinDto: SigninDto = {
      email: signupDto.email,
      password: signupDto.password,
    };

    const response = await request(app.getHttpServer())
      .post('/signin')
      .send(signinDto)
      .expect(HttpStatus.OK);

    const profileResponse = await request(app.getHttpServer())
      .get('/profile')
      .set('Authorization', `Bearer ${response.body.access_token}`)
      .expect(HttpStatus.OK);

    expect(profileResponse.body.id).toBeDefined();
    expect(profileResponse.body.email).toBeDefined();
    expect(profileResponse.body.phoneNumber).toBeDefined();
    expect(profileResponse.body.lastName).toBeDefined();
    expect(profileResponse.body.firstName).toBeDefined();
    expect(profileResponse.body.nickName).toBeDefined();
    expect(profileResponse.body.description).toBeDefined();
    expect(profileResponse.body.position).toBeDefined();
    expect(profileResponse.body.createdAt).toBeDefined();
    expect(profileResponse.body.updatedAt).toBeDefined();

    expect(profileResponse.body.password).toBeUndefined();
  });

  it('/profile (GET) - Unauthorized without token', async () => {
    const response = await request(app.getHttpServer())
      .get('/profile')
      .expect(HttpStatus.UNAUTHORIZED);

    expect(response.body.message).toBe('Unauthorized');
  });
});

describe('Company Tests (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const signupDto: SignupDto = generateRandomSignupDto();
    await request(app.getHttpServer())
      .post('/signup')
      .send(signupDto)
      .expect(HttpStatus.CREATED);

    const signinDto: SigninDto = {
      email: signupDto.email,
      password: signupDto.password,
    };

    const signinResponse = await request(app.getHttpServer())
      .post('/signin')
      .send(signinDto)
      .expect(HttpStatus.OK);

    console.log({ signinDto });

    accessToken = signinResponse.body.access_token;
  });

  afterEach(async () => {
    await app.close();
  });

  it('/company (POST) - Successful company creation', async () => {
    const companyDto = generateRandomCompanyDto();

    const response = await request(app.getHttpServer())
      .post('/company')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(companyDto)
      .expect(HttpStatus.CREATED);

    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe(companyDto.name);
  });

  it('/company (POST) - Unauthorized without token', async () => {
    const companyDto = generateRandomCompanyDto();

    const response = await request(app.getHttpServer())
      .post('/company')
      .send(companyDto)
      .expect(HttpStatus.UNAUTHORIZED);

    expect(response.body.message).toBe('Unauthorized');
  });

  ////////

  it('/company (POST) - Validation error on missing fields', async () => {
    const invalidCompanyDto = {
      // Missing required fields
    };

    const response = await request(app.getHttpServer())
      .post('/company')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(invalidCompanyDto)
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('/company (POST) - Validation error on invalid number of employees', async () => {
    const invalidCompanyDto = {
      ...generateRandomCompanyDto(),
      numberOfEmployees: 'invalid', // Invalid number format
    };

    const response = await request(app.getHttpServer())
      .post('/company')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(invalidCompanyDto)
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('/companies (GET) - Get all companies', async () => {
    // Create companies for testing

    const companiesList = [];

    const amount = 500;

    for (let i = 0; i < amount; i++) {
      const promise = await request(app.getHttpServer())
        .post('/company')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(generateRandomCompanyDto())
        .expect(HttpStatus.CREATED);

      companiesList.push(promise);
    }

    const response = await request(app.getHttpServer())
      .post('/companies')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK);

    expect(response.body).toHaveLength(amount);

  }, 100000);
});
