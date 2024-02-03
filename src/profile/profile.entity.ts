import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsString, IsArray } from 'class-validator';
import { User } from '../auth/user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tagline: string;

  @Column()
  profession: string;

  @Column()
  income: number;

  @Column()
  company: string;

  @IsArray()
  @IsString({ each: true })
  @Column('varchar', { array: true, nullable: true })
  links: string[];

  @IsArray()
  @IsString({ each: true })
  @Column('varchar', { array: true, nullable: true })
  emails: string[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
