import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Bookreview } from '../bookreviews/entities/bookreview.entity';
import { Category } from '../categories/entities/category.entity';
import { Author } from '../authors/entities/author.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Book, Bookreview, Category, Author]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
