import { Controller, Delete, Get, Post } from '@nestjs/common';
import { RecipeService } from './recipe.service';

@Controller('recipe')
export class RecipeController {
  // Lo que llega a la ruta /recipe

  constructor(private recipeService: RecipeService) {}

  @Get()
  getAllRecipes() {
    return this.recipeService.getAllRecipes();
  }

  @Get()
  getRecipeById() {
    return this.recipeService.getRecipeById();
  }

  @Post()
  postRecipe() {
    return this.recipeService.postRecipe();
  }

  @Delete()
  deleteRecipe() {
    return this.recipeService.deleteRecipe();
  }
}
