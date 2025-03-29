import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Category } from './category.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  imagePath: string;
  @Prop({ required: true })
  price: number;
  @Prop({ type: [{ name: String, icon: String }], required: true })
  ingredients: { name: string; icon: string }[];
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
