import { Injectable } from '@nestjs/common';

@Injectable()
export class RecipeService {
  // Métodos a inyectar en el controller

  getAllRecipes() {
    return 'These are all the recipes!';
  }

  getRecipeById() {}

  postRecipe() {}

  deleteRecipe() {}
}
