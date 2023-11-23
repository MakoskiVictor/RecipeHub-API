import { CreateRecipeDTO } from '../dto/create-recipe-dto';
import { RecipeApi } from '../types/recipe-api-types';
import { extractSteps } from './extractSteps';
import { Repository } from 'typeorm';
import { Diet } from 'src/entities/diet.entity';
import { Recipe } from 'src/entities/recipe.entity';

export const postFromApi = async (
  dietRepository: Repository<Diet>,
  recipeRepository: Repository<Recipe>,
) => {
  // Llamada a api

  const searchFromApi: RecipeApi = await fetch(
    `https://api.spoonacular.com/recipes/random?apiKey=${process.env.API_KEY}&addRecipeInformation=true&number=100`,
  ).then((res) => res.json());

  // Mapeo de respuesta

  const mapSearchedRecipesFromApi: CreateRecipeDTO[] =
    searchFromApi.recipes.map((r) => {
      return {
        name: r.title,
        summary: r.summary,
        healthScore: r.healthScore,
        steps: extractSteps(r.analyzedInstructions),
        image: r.image,
        diets: r.diets,
      };
    });

  // Posteo de recipes recibidad de la Api

  for (let i = 0; i < mapSearchedRecipesFromApi.length; i++) {
    // Preparar diets para posteo

    const selectedDiets = await Promise.all(
      mapSearchedRecipesFromApi[i].diets.map(
        async (diet) => await dietRepository.findOne({ where: { name: diet } }),
      ),
    );

    // Postear new recipe

    const newRecipe = new Recipe();
    newRecipe.name = mapSearchedRecipesFromApi[i].name;
    newRecipe.steps = mapSearchedRecipesFromApi[i].steps;
    newRecipe.healthScore = mapSearchedRecipesFromApi[i].healthScore;
    newRecipe.summary = mapSearchedRecipesFromApi[i].summary;
    newRecipe.image =
      mapSearchedRecipesFromApi[i].image ||
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTABE23O3ZT5uGShVBbMEMpQM3u2M3f4WldUA&usqp=CAU';
    newRecipe.diets = selectedDiets;

    await recipeRepository.save(newRecipe);
  }

  return mapSearchedRecipesFromApi;
};
