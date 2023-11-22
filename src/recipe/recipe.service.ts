import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from 'src/entities/recipe.entity';
import { Repository } from 'typeorm';
import { CreateRecipeDTO } from './dto/create-recipe-dto';
import { Diet } from 'src/entities/diet.entity';
import { RecipeApi } from './types/recipe-api-types';
import { extractSteps } from './utils';

@Injectable()
export class RecipeService {
  // Inyecto la db con el constructor
  constructor(
    @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
    @InjectRepository(Diet) private dietRepository: Repository<Diet>,
  ) {}

  // Métodos a inyectar en el controller

  async getAllRecipes() {
    const getRecipes = await this.recipeRepository.find();

    if (getRecipes.length === 0) {
      const searchFromApi: RecipeApi = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.API_KEY}&addRecipeInformation=true&number=2`,
      ).then((res) => res.json());

      const mapSearchedRecipesFromApi: CreateRecipeDTO[] =
        searchFromApi.recipes.map((r) => {
          return {
            name: r.title,
            summary: r.summary,
            healthScore: r.healthScore,
            steps: extractSteps(r.analyzedInstructions),
            image: r.sourceUrl,
            diets: r.diets,
          };
        });

      for (let i = 0; i < mapSearchedRecipesFromApi.length; i++) {
        const selectedDiets = await Promise.all(
          mapSearchedRecipesFromApi[i].diets.map(
            async (diet) =>
              await this.dietRepository.findOne({ where: { name: diet } }),
          ),
        );

        const newRecipe = new Recipe();
        newRecipe.name = mapSearchedRecipesFromApi[i].name;
        newRecipe.steps = mapSearchedRecipesFromApi[i].steps;
        newRecipe.healthScore = mapSearchedRecipesFromApi[i].healthScore;
        newRecipe.summary = mapSearchedRecipesFromApi[i].summary;
        newRecipe.image =
          mapSearchedRecipesFromApi[i].image ||
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTABE23O3ZT5uGShVBbMEMpQM3u2M3f4WldUA&usqp=CAU';
        newRecipe.diets = selectedDiets;

        await this.recipeRepository.save(newRecipe);
      }

      return mapSearchedRecipesFromApi;
    }

    const getNewRecipes = await this.recipeRepository.find();
    return getNewRecipes;
  }

  getRecipeById() {}

  // POSTEO DE RECIPE
  async postRecipe(recipe: CreateRecipeDTO) {
    // BUSCA SI EL NOMBRE DE RECIPE YA EXISTE
    const searchRecipe = await this.recipeRepository.findOne({
      where: {
        name: recipe.name,
      },
    });

    // CONTROLADOR DE ERRORES EN CASO DE QUE EXISTA
    if (searchRecipe) {
      return new HttpException('Recipe alredy exist', HttpStatus.CONFLICT);
    }

    // BUSCA LAS DIETS POR ID

    const SelectedDiets = await Promise.all(
      recipe.diets.map(
        async (dietId) =>
          await this.dietRepository.findOne({ where: { id: dietId } }),
      ),
    );

    // CONTROLADOR DE ERRORES EN CASO QUE LAS DIETS NO EXISTAN
    if (!SelectedDiets)
      return new HttpException('Diets ID not found', HttpStatus.NOT_FOUND);

    // POSTEO DE LA RECIPE

    const newRecipe = new Recipe();
    newRecipe.name = recipe.name;
    newRecipe.steps = recipe.steps;
    newRecipe.healthScore = recipe.healthScore;
    newRecipe.summary = recipe.summary;
    newRecipe.image =
      recipe.image ||
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTABE23O3ZT5uGShVBbMEMpQM3u2M3f4WldUA&usqp=CAU';
    newRecipe.diets = SelectedDiets;

    return this.recipeRepository.save(newRecipe);
  }

  async deleteRecipe(id: string) {
    const searchRecipe = await this.recipeRepository.findOneById(id);
    if (!searchRecipe) {
      return new HttpException('There are no recipes', HttpStatus.NOT_FOUND);
    }
    return this.recipeRepository.remove(searchRecipe);
  }
}
