import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEmail,
  Length,
} from 'class-validator';

export class CreateAuthorDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  name: string;

  @IsOptional()
  @IsString()
  bio?: string;
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  website?: string;
}
