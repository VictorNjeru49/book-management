import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsArray } from 'class-validator';
import { CreateBookDto } from './create-book.dto';
import { Author } from '../../authors/entities/author.entity';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  author?: Author;

  @IsOptional()
  categoryId?: string;

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsOptional()
  @IsString()
  description?: string;
}
