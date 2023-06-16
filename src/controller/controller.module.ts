import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProfileService } from '../components/profileService/Profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async saveProfile(@Body() profileData: any) {
    try {
      const { userId } = profileData; // Assuming the user ID is included in the profileData object
      const savedProfile = await this.profileService.createProfile(
        userId,
        profileData,
      );

      console.log('Saved Profile:', savedProfile);
      return { message: 'Profile saved successfully', profile: savedProfile };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  // @Get(':userId')
  // async getProfile(@Param('userId') userId: string) {
  //   try {
  //     const profile = await this.profileService.getProfile(userId);
  //     console.log('Profile:', profile);
  //     return { profile };
  //   } catch (error) {
  //     console.error('Error:', error);
  //     throw error;
  //   }
  // }

  @Get('all')
  async getAllProfiles() {
    try {
      const profiles = await this.profileService.getAllProfiles();
      console.log('Successful:');
      return { profiles };
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
