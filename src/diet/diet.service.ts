import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Diet } from 'src/entities/diet.entity';
import { Repository } from 'typeorm';
import { CreateDietDTO } from './dto/create-diet.dto';

@Injectable()
export class DietService {
  // Se inyecta la db con el constructor
  constructor(
    @InjectRepository(Diet) private dietRepository: Repository<Diet>,
  ) {}

  // Se crean los métodos a inyectar en el controller
  postDiet(diet: CreateDietDTO) {
    const newDiet = this.dietRepository.create(diet);
    return this.dietRepository.save(newDiet);
  }
  async getDiets() {
    return this.dietRepository.find();
  }
}
