import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './recipe';
import { DietModule } from './diet';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diet } from './entities/diet.entity';
import { Recipe } from './entities/recipe.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'recipehub',
      entities: [Diet, Recipe],
      synchronize: true,
    }),
    RecipeModule,
    DietModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
