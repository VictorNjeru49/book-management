import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import {
  IsNotEmpty,
  IsString,
  Length,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { Book } from '../../books/entities/book.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  name: string;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @ManyToMany(() => Book, (book) => book.categories)
  books: Book[];
}
