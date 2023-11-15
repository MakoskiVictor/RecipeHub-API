import { Module } from '@nestjs/common';
import { DietController } from './diet.controller';
import { DietService } from './diet.service';
import { Diet } from 'src/entities/diet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

// Debo avisar al módulo, que entidad voy a estar usando
@Module({
  imports: [TypeOrmModule.forFeature([Diet])],
  controllers: [DietController],
  providers: [DietService],
})
export class DietModule {}
