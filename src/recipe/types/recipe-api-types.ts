export interface RecipeApi {
  recipes: Recipe[];
}

interface Recipe {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  lowFodmap: boolean;
  weightWatcherSmartPoints: number;
  gaps: string;
  preparationMinutes: number;
  cookingMinutes: number;
  aggregateLikes: number;
  healthScore: number;
  creditsText: string;
  sourceName: string;
  pricePerServing: number;
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  image: string;
  imageType: string;
  summary: string;
  cuisines: any[];
  dishTypes: string[];
  diets: string[];
  occasions: any[];
  analyzedInstructions: AnalyzedInstruction[];
  spoonacularScore: number;
  spoonacularSourceUrl: string;
}

export interface AnalyzedInstruction {
  name: string;
  steps: Step[];
}

interface Step {
  number: number;
  step: string;
  ingredients: Ingredient[];
  equipment: Ingredient[];
  length?: Length;
}

interface Length {
  number: number;
  unit: string;
}

interface Ingredient {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}
