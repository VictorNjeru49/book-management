import { Book } from '../../books/entities/book.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {
  IsNotEmpty,
  IsString,
  Length,
  IsOptional,
  IsDate,
  MaxLength,
  IsDateString,
} from 'class-validator';

@Entity()
export class Author {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  name: string;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @MaxLength(1000)
  bio?: string;

  @Column({ type: 'date', nullable: true })
  @IsOptional()
  @IsDateString()
  @IsDate({ message: 'Birth date cannot be in the future' })
  birthDate?: Date;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
