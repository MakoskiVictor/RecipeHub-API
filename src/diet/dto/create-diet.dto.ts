import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDietDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}
