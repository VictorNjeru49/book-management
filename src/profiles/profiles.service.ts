import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private profileRepo: Repository<Profile>,
  ) {}

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const profile = this.profileRepo.create(createProfileDto);
    return this.profileRepo.save(profile);
  }

  async findAll(): Promise<Profile[]> {
    return this.profileRepo.find();
  }

  async findOne(id: number): Promise<Profile | null> {
    const profile = await this.profileRepo.findOneBy({ id });
    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
    return profile;
  }

  async update(
    id: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile | null> {
    await this.profileRepo.update(id, updateProfileDto);
    const updatedProfile = await this.profileRepo.findOneBy({ id });
    if (!updatedProfile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
    return updatedProfile;
  }

  async remove(id: number): Promise<void> {
    const result = await this.profileRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
  }
}
