import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from 'src/app/models/category.schema';
import { Product, ProductDocument } from 'src/app/models/product.schema';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async create(data: CreateCategoryDto): Promise<Category> {
    return this.categoryModel.create(data);
  }

  async findByCategory(categoryId: string): Promise<Product[]> {
    return this.productModel.find({ category: categoryId }).exec();
  }
}
