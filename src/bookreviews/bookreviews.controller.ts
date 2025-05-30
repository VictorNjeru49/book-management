import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { BookreviewsService } from './bookreviews.service';
import { CreateBookreviewDto } from './dto/create-bookreview.dto';
import { UpdateBookreviewDto } from './dto/update-bookreview.dto';

@Controller('bookreviews')
export class BookreviewsController {
  constructor(private readonly bookreviewsService: BookreviewsService) {}

  @Post()
  create(@Body(new ValidationPipe()) createBookreviewDto: CreateBookreviewDto) {
    return this.bookreviewsService.create(createBookreviewDto);
  }

  @Get()
  findAll() {
    return this.bookreviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bookreviewsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateBookreviewDto: UpdateBookreviewDto,
  ) {
    return this.bookreviewsService.update(id, updateBookreviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.bookreviewsService.remove(id);
  }
}
