import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { IsNotEmpty, IsUrl, Max, Min } from 'class-validator';

@Entity({ name: 'recipes' })
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  @IsNotEmpty()
  id: UUID;

  @Column({ type: 'varchar' })
  @IsNotEmpty()
  name: string;

  @Column({ type: 'text' })
  @IsNotEmpty()
  summary: string;

  @Column({ type: 'float' })
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  healthScore: number;

  @Column({ type: 'text' })
  @IsNotEmpty()
  steps: string;

  @Column({ type: 'varchar' })
  @IsNotEmpty()
  @IsUrl()
  image: string;
}
