export class CreateRecipeDTO {
  name: string;

  summary: string;

  healthScore: number;

  steps: string;

  image: string;

  diets: DietsId[];
}

type DietsId = string;
