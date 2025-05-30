import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookreviewDto } from './dto/create-bookreview.dto';
import { UpdateBookreviewDto } from './dto/update-bookreview.dto';
import { Bookreview } from './entities/bookreview.entity';

@Injectable()
export class BookreviewsService {
  constructor(
    @InjectRepository(Bookreview)
    private bookReviewRepo: Repository<Bookreview>,
  ) {}

  async create(createBookreviewDto: CreateBookreviewDto): Promise<Bookreview> {
    const bookReview = this.bookReviewRepo.create(createBookreviewDto);
    return this.bookReviewRepo.save(bookReview);
  }

  async findAll(): Promise<Bookreview[]> {
    return this.bookReviewRepo.find();
  }

  async findOne(id: number): Promise<Bookreview | null> {
    const bookReview = await this.bookReviewRepo.findOneBy({ id });
    if (!bookReview) {
      throw new NotFoundException(`Book review with ID ${id} not found`);
    }
    return bookReview;
  }

  async update(
    id: number,
    updateBookreviewDto: UpdateBookreviewDto,
  ): Promise<Bookreview | null> {
    await this.bookReviewRepo.update(id, updateBookreviewDto);
    const updatedBookReview = await this.bookReviewRepo.findOneBy({ id });
    if (!updatedBookReview) {
      throw new NotFoundException(`Book review with ID ${id} not found`);
    }
    return updatedBookReview;
  }

  async remove(id: number): Promise<void> {
    const result = await this.bookReviewRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Book review with ID ${id} not found`);
    }
  }
}
