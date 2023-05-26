import { Controller, Post, Body } from '@nestjs/common';

@Controller('profile')
export class ProfileController {
  @Post()
  saveProfile(@Body() profileData: any) {
    // Generate a new ID on the server
    const newId = Date.now().toString();

    // Add the generated ID to the profile data
    profileData.id = newId;

    // Handle and save the profile data here
    console.log('Generated ID:', newId);
    console.log('Profile Data:', profileData);

    // Return a response with the profile data
    return { message: 'Profile saved successfully' };
  }
}
