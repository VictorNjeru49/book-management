import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBookreviewDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  bookId: string; // Reference to the book ID

  @IsNotEmpty()
  userId: string; // Reference to the user ID
}
