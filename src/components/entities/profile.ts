import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ExperienceEntry } from './experienceEntry';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ default: '' })
  userId: string; // Firebase user ID

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  profileImage: string;

  @Column({ nullable: true })
  specialty: string;

  @Column({ nullable: true })
  availability: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  contactInfo: string;

  @OneToMany(() => ExperienceEntry, (entry) => entry.profile, {
    cascade: true,
    eager: true,
  })
  experienceEntries: ExperienceEntry[];

  @Column({ nullable: true })
  gender: string;
}
