import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { DietService } from './diet.service';
import { CreateDietDTO } from './dto/create-diet.dto';

@Controller('diet')
export class DietController {
  constructor(private dietService: DietService) {}

  @Get()
  getDIets() {
    return this.dietService.getDiets();
  }

  @Post()
  postDiet(@Body() newDiet: CreateDietDTO) {
    return this.dietService.postDiet(newDiet);
  }

  @Delete()
  deleteDiets() {
    return this.dietService.deleteDiets();
  }
}
