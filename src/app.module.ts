import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './recipe';
import { DietModule } from './diet';

@Module({
  imports: [RecipeModule, DietModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
