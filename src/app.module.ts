import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './recipe';
import { DietModule } from './diet';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diet } from './entities/diet.entity';
import { Recipe } from './entities/recipe.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
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
