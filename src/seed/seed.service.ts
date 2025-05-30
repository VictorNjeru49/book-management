import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Author } from 'src/authors/entities/author.entity';
import { Bookreview } from 'src/bookreviews/entities/bookreview.entity';
import { Book } from 'src/books/entities/book.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Category } from 'src/categories/entities/category.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Author) private authorRepo: Repository<Author>,
    @InjectRepository(Bookreview)
    private bookReviewRepo: Repository<Bookreview>,
    @InjectRepository(Book) private bookRepo: Repository<Book>,
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async seedUsers(count: number = 10): Promise<User[]> {
    const users = this.userRepo.create(
      Array.from({ length: count }).map(() => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        profileId: faker.string.uuid(),
      })),
    );
    return this.userRepo.save(users);
  }

  async seedAuthors(count: number = 5): Promise<Author[]> {
    const authors = this.authorRepo.create(
      Array.from({ length: count }).map(() => ({
        name: faker.person.firstName(),
        bio: faker.lorem.paragraph(),
      })),
    );
    return this.authorRepo.save(authors);
  }

  async seedBooks(count: number = 10): Promise<Book[]> {
    const books = this.bookRepo.create(
      Array.from({ length: count }).map(() => ({
        title: faker.lorem.word(3).concat(''),
        authorId: faker.string.uuid(),
        categoryId: faker.string.uuid(),
      })),
    );
    return this.bookRepo.save(books);
  }

  async seedBookReviews(count: number = 10): Promise<Bookreview[]> {
    const reviews = this.bookReviewRepo.create(
      Array.from({ length: count }).map(() => ({
        content: faker.lorem.sentence(),
        bookId: faker.string.uuid(),
        userId: faker.string.uuid(),
      })),
    );
    return this.bookReviewRepo.save(reviews);
  }

  async seedProfiles(count: number = 10): Promise<Profile[]> {
    const profiles = this.profileRepo.create(
      Array.from({ length: count }).map(() => ({
        bio: faker.lorem.sentence(),
        avatar: faker.image.avatar(),
      })),
    );
    return this.profileRepo.save(profiles);
  }

  async seedCategories(count: number = 5): Promise<Category[]> {
    const categories = this.categoryRepo.create(
      Array.from({ length: count }).map(() => ({
        name: faker.commerce.department(),
      })),
    );
    return this.categoryRepo.save(categories);
  }

  async seedAll(): Promise<void> {
    await this.seedUsers();
    await this.seedAuthors();
    await this.seedBooks();
    await this.seedBookReviews();
    await this.seedProfiles();
    await this.seedCategories();
  }
}
