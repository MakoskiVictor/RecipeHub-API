import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDTO } from './dto/create-recipe-dto';

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
  postRecipe(@Body() newRecipe: CreateRecipeDTO) {
    return this.recipeService.postRecipe(newRecipe);
  }

  @Delete(':id')
  deleteRecipe(@Param('id') id: string) {
    return this.recipeService.deleteRecipe(id.toString());
  }
}
