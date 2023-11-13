import { Injectable } from '@nestjs/common';

@Injectable()
export class DietService {
  // Se crean los métodos a inyectar en el controller
  getDiets() {
    return 'These are all the diets!';
  }
}
