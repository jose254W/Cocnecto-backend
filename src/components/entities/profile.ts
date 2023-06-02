import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ExperienceEntry } from './experienceEntry';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ default: '' })
  userId: string; // Firebase user ID

  @Column()
  profileImage: string;

  @Column()
  specialty: string;

  @Column()
  availability: string;

  @Column()
  location: string;

  @Column()
  contactInfo: string;

  @OneToMany(() => ExperienceEntry, (entry) => entry.profile, {
    cascade: true,
    eager: true,
  })
  experienceEntries: ExperienceEntry[];

  @Column()
  gender: string;
}
