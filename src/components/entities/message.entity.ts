import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userId: string;

  @Column()
  sender: string;

  @Column()
  content: string;

  @Column({
    type: 'timestamp',
    default: () => `now() at time zone 'UTC' at time zone 'Africa/Nairobi'`,
  })
  timestamp: Date;
}
