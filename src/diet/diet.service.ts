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

  deleteDiets() {
    return this.dietRepository.clear();
  }

  async getDiets() {
    const allDiets = await this.dietRepository.find();
    console.log(allDiets);
    if (allDiets.length === 0) {
      const types = [
        'gluten free',
        'dairy free',
        'ketogenic',
        'vegetarian',
        'lacto vegetarian',
        'lacto ovo vegetarian',
        'ovo vegetarian',
        'vegan',
        'pescatarian',
        'paleolithic',
        'primal',
        'fodmap friendly',
        'whole 30',
      ];

      types.map(async (d) => {
        const diets = new Diet();
        diets.name = d;

        await this.dietRepository.save(diets);
      });
      const allDiets = await this.dietRepository.manager.find(Diet);
      return allDiets;
    } else {
      return allDiets;
    }
  }
}
