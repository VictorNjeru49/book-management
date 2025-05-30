import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';
import { Author } from '../../authors/entities/author.entity';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: Author;

  @IsNotEmpty()
  categoryId: string;

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsOptional()
  @IsString()
  description?: string;
}
