import { Controller, Get } from '@nestjs/common';
import { DietService } from './diet.service';

@Controller('diet')
export class DietController {
  constructor(private dietService: DietService) {}

  @Get()
  getDIets() {
    return this.dietService.getDiets();
  }
}
