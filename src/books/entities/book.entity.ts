import { Author } from '../../authors/entities/author.entity';
import { Bookreview } from '../../bookreviews/entities/bookreview.entity';
import { Category } from '../../categories/entities/category.entity';
import { IsNotEmpty, IsString, Length, IsInt, Min, Max } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  Relation,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  @Length(1, 200)
  title: string;

  @Column({ type: 'text' })
  @IsNotEmpty()
  @IsString()
  @Length(10, 2000)
  description: string;

  @Column()
  @IsNotEmpty()
  authorId: number;

  @Column()
  @IsNotEmpty()
  categoryId: number;

  @Column()
  @IsNotEmpty()
  @IsInt()
  @Min(1000)
  @Max(new Date().getFullYear())
  publicationYear: number;

  @Column({ default: true })
  isAvailable: boolean;

  @ManyToOne(() => Author, (author) => author.books)
  @JoinColumn({ name: 'authorId' })
  author: Relation<Author>;

  @OneToMany(() => Bookreview, (review) => review.book)
  reviews: Relation<Bookreview[]>;

  @ManyToMany(() => Category, (category) => category.books)
  @JoinTable({ name: 'categoryId' })
  categories: Relation<Category[]>;
}
