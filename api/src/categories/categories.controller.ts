import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Product } from 'src/app/models/product.schema';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Post()
  create(@Body() data: CreateCategoryDto) {
    return this.categoriesService.create(data);
  }

  @Get(':categoryId/products')
  async getProductsByCategory(
    @Param('categoryId') categoryId: string,
  ): Promise<Product[]> {
    return this.categoriesService.findByCategory(categoryId);
  }
}
