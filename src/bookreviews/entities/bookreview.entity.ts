import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Relation,
  JoinColumn,
} from 'typeorm';
import { IsNotEmpty, IsString, Length, IsInt, Min, Max } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Book } from '../../books/entities/book.entity';

@Entity()
export class Bookreview {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'text' })
  @IsNotEmpty()
  @IsString()
  @Length(10, 1000)
  content: string;

  @Column()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @Column()
  @IsNotEmpty()
  userId: number;

  @Column()
  @IsNotEmpty()
  bookId: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'userId' })
  user: Relation<User>;

  @ManyToOne(() => Book, (book) => book.reviews)
  @JoinColumn({ name: 'bookId' })
  book: Relation<Book>;
}
