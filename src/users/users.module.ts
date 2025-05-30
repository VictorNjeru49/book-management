import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profile } from '../profiles/entities/profile.entity';
import { Bookreview } from '../bookreviews/entities/bookreview.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([User, Profile, Bookreview]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
