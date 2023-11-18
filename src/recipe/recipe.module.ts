import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diet } from 'src/entities/diet.entity';
import { Recipe } from 'src/entities/recipe.entity';

// Importo las tablas a usar en este módulo
@Module({
  imports: [TypeOrmModule.forFeature([Diet, Recipe])],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
