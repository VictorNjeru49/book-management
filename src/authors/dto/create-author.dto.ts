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
  name: string; // Author's name

  @IsOptional()
  @IsString()
  bio?: string; // Optional biography of the author

  @IsOptional()
  @IsEmail()
  email?: string; // Optional email address for the author

  @IsOptional()
  @IsString()
  website?: string; // Optional website URL for the author
}
