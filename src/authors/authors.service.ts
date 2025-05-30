import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';
@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorRepo: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = this.authorRepo.create(createAuthorDto);
    return this.authorRepo.save(author);
  }

  async findAll(): Promise<Author[]> {
    return this.authorRepo.find();
  }

  async findOne(id: string): Promise<Author | null> {
    const author = await this.authorRepo.findOneBy({ id });
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  async update(
    id: string,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author | null> {
    await this.authorRepo.update(id, updateAuthorDto);
    const updatedAuthor = await this.authorRepo.findOneBy({ id });
    if (!updatedAuthor) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return updatedAuthor;
  }

  async remove(id: string): Promise<void> {
    const result = await this.authorRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
  }
}
