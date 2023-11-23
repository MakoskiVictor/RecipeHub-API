import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object[] {
    return [
      {
        route: '/diet',
        method: 'Get',
        explanation: 'Get list of diets',
      },
      {
        route: '/recipe',
        method: 'Get',
        explanation: 'Get list of recipes',
      },
      {
        route: '/recipe',
        method: 'Post',
        explanation: 'Post a new recipe',
        structure: `
        name: string,
        summary: string,
        healthScore: number(0 to 100),
        steps: string,
        image: url,
        diets: Diet[dietName]`,
      },
      {
        route: '/recipe/:id',
        method: 'Get',
        explanation: 'Get an especific recipe',
      },
      {
        route: '/recipe/:id',
        method: 'Delete',
        explanation: 'Delete an especific recipe',
      },
    ];
  }
}
