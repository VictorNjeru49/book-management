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
    const profiles = await this.seedProfiles(count);

    const users = this.userRepo.create(
      Array.from({ length: count }).map((_, index) => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        profileId: profiles[index].id,
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
    const existingCategories = await this.categoryRepo.find();
    if (existingCategories.length > 0) {
      console.log('Categories already exist. Skipping seeding.');
      return existingCategories;
    }

    const categories = this.categoryRepo.create(
      Array.from({ length: count }).map(() => ({
        name: faker.commerce.department(),
      })),
    );
    return this.categoryRepo.save(categories);
  }
  async seedBooks(count: number = 10): Promise<Book[]> {
    const authors = await this.seedAuthors(count);
    const categories: Category[] = await this.categoryRepo.find();

    if (authors.length === 0) {
      console.error('No authors found. Cannot seed books.');
      return [];
    }
    if (categories.length === 0) {
      console.error('No categories found. Cannot seed books.');
      return [];
    }

    const booksData = Array.from({ length: count }).map(() => {
      return {
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        authorId:
          authors[faker.number.int({ min: 0, max: authors.length - 1 })].id,
        categories: faker.helpers.arrayElements(categories, { min: 1, max: 3 }),
        publicationYear: faker.date.past().getFullYear(),
        isAvailable: true,
      };
    });

    console.log('Books data to be seeded:', booksData);

    try {
      const savedBooks = await this.bookRepo.save(booksData);
      console.log('Books seeded successfully:', savedBooks);
      return savedBooks;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error seeding books:', error.message);
      } else {
        console.error('Unexpected error seeding books:', error);
      }
      return [];
    }
  }

  async seedBookReviews(count: number = 10): Promise<Bookreview[]> {
    const books = await this.seedBooks(count);
    const users = await this.seedUsers(count);

    if (books.length === 0) {
      console.error('No books found. Cannot seed book reviews.');
      return [];
    }
    if (users.length === 0) {
      console.error('No users found. Cannot seed book reviews.');
      return [];
    }
    const reviewsData = Array.from({ length: count }).map((_, index) => ({
      content: faker.lorem.sentence(),
      rating: faker.number.int({ min: 1, max: 5 }),
      userId: users[index].id,
      bookId: books[index].id,
    }));

    console.log('Reviews data to be seeded:', reviewsData);

    try {
      const savedReviews = await this.bookReviewRepo.save(reviewsData);
      console.log('Book reviews seeded successfully:', savedReviews);
      return savedReviews;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error seeding book reviews:', error.message);
      } else {
        console.error('Unexpected error seeding book reviews:', error);
      }
      return [];
    }
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
    await this.seedProfiles();
    await this.seedUsers();
    await this.seedAuthors();
    await this.seedCategories();
    await this.seedBooks();
    await this.seedBookReviews();
  }
}
