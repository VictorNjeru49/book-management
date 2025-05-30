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
    const profiles = await this.seedProfiles(count); // Ensure profiles are created first

    const users = this.userRepo.create(
      Array.from({ length: count }).map((_, index) => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        profileId: profiles[index].id, // Link to the created profile
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

  async seedCategories(count: number = 5): Promise<Category[]> {
    const categories = this.categoryRepo.create(
      Array.from({ length: count }).map(() => ({
        name: faker.commerce.department(),
      })),
    );
    return this.categoryRepo.save(categories);
  }

  async seedBooks(count: number = 10): Promise<Book[]> {
    const authors = await this.seedAuthors(count); // Ensure authors are created first
    const categories = await this.seedCategories(count); // Ensure categories are created first

    const books = this.bookRepo.create(
      Array.from({ length: count }).map((_, index) => ({
        title: faker.lorem.words(3).concat(' '),
        authorId: authors[index].id, // Link to the created author
        categoryId: categories[index].id, // Link to a category
      })),
    );
    return this.bookRepo.save(books);
  }

  async seedBookReviews(count: number = 10): Promise<Bookreview[]> {
    const books = await this.seedBooks(count); // Ensure books are created first
    const users = await this.seedUsers(count); // Ensure users are created first

    const reviews = this.bookReviewRepo.create(
      Array.from({ length: count }).map((_, index) => ({
        content: faker.lorem.sentence(),
        bookId: books[index].id, // Link to a book
        userId: users[index].id, // Link to a user
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

  async seedAll(): Promise<void> {
    await this.seedProfiles(); // Seed profiles first
    await this.seedUsers(); // Seed users with profiles
    await this.seedAuthors(); // Seed authors
    await this.seedCategories(); // Seed categories
    await this.seedBooks(); // Seed books with authors and categories
    await this.seedBookReviews(); // Seed reviews with books and users
  }
}
