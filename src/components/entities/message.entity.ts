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
    default: () => new Date(),
  })
  timestamp: Date;
}
