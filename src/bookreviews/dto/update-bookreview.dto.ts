import { PartialType } from '@nestjs/mapped-types';
import { CreateBookreviewDto } from './create-bookreview.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateBookreviewDto extends PartialType(CreateBookreviewDto) {
  @IsOptional()
  @IsString()
  content?: string;
}
