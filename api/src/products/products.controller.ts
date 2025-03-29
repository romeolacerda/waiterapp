import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Product } from 'src/app/models/product.schema';
import { multerConfig } from 'src/utils/multer.config';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    const productData = {
      ...createProductDto,
      imagePath: image.filename,
    };

    return this.productsService.create(productData);
  }
}
