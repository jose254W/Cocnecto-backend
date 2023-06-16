import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../entities/profile';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async createProfile(userId: string, profileData: any): Promise<Profile> {
    const newProfile: Profile = {
      userId,
      fullName: profileData.fullName,
      profileImage: profileData.profileImage,
      specialty: profileData.specialty,
      availability: profileData.availability,
      location: profileData.location,
      contactInfo: profileData.contactInfo,
      experienceEntries: profileData.experienceEntries,
      gender: profileData.gender,
      id: 0,
    };

    return this.profileRepository.save(newProfile);
  }

  // async getProfile(userId: string): Promise<Profile> {
  //   try {
  //     const profile = await this.profileRepository.findOne({
  //       where: { userId },
  //     });
  //     if (!profile) {
  //       throw new Error('Profile not found');
  //     }
  //     return profile;
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // }

  async getAllProfiles(): Promise<Profile[]> {
    try {
      const profiles = await this.profileRepository.find();
      if (!profiles) {
        throw new Error('Not available');
      }
      return profiles;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
