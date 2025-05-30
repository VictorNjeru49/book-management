import { Controller, Post, Query } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  async seedAll(
    @Query('users') usersCount: number = 10,
    @Query('authors') authorsCount: number = 5,
    @Query('books') booksCount: number = 10,
    @Query('reviews') reviewsCount: number = 10,
    @Query('profiles') profilesCount: number = 10,
    @Query('categories') categoriesCount: number = 5,
  ) {
    await this.seedService.seedUsers(usersCount);
    await this.seedService.seedAuthors(authorsCount);
    await this.seedService.seedBooks(booksCount);
    await this.seedService.seedBookReviews(reviewsCount);
    await this.seedService.seedProfiles(profilesCount);
    await this.seedService.seedCategories(categoriesCount);

    return { message: 'Seeding completed successfully!' };
  }
}
