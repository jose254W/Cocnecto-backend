// import { Repository, EntityRepository } from 'typeorm';
// import { Profile } from '../entities/profile';

// @EntityRepository(Profile)
// export class ProfileRepository extends Repository<Profile> {
//   async createProfile(profileData: Partial<Profile>): Promise<Profile> {
//     const profile = new Profile();
//     profile.profileImage = profileData.profileImage;
//     profile.specialty = profileData.specialty;
//     profile.availability = profileData.availability;
//     profile.location = profileData.location;
//     profile.contactInfo = profileData.contactInfo;
//     profile.experienceEntries = profileData.experienceEntries;
//     profile.gender = profileData.gender;

//     return this.save(profile);
//   }

//   // Add more custom methods for database operations specific to the Profile entity if needed
// }
