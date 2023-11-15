/* import { IsNotEmpty } from 'class-validator'; */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Diet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
