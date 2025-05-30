import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookreviewDto {
  @IsNotEmpty()
  @IsString()
  content: string;
  @IsNotEmpty()
  @IsNumber()
  rating: number;
  @IsNotEmpty()
  @IsNumber()
  bookId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
