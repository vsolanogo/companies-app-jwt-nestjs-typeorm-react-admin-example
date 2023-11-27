import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { IsString, IsInt } from 'class-validator';
import { User } from '../user/user.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (i) => i.companies)
  user: User;

  @Column({ nullable: false, length: 255 })
  @IsString()
  name: string;

  @Column({ nullable: false, type: 'text' })
  @IsString()
  address: string;

  @Column({ nullable: false, length: 255 })
  @IsString()
  serviceOfActivity: string;

  @Column({ nullable: false })
  @IsInt()
  numberOfEmployees: number;

  @Column({ nullable: false, type: 'text' })
  @IsString()
  description: string;

  @Column({ nullable: false, length: 50 })
  @IsString()
  type: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
