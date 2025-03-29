import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Product } from './product.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: { createdAt: 'created_at' } })
export class Order {
  @Prop({ required: true })
  table: string;
  @Prop({
    required: true,
    enum: ['WAITING', 'IN_PRODUCTION', 'DONE'],
    default: 'WAITING',
  })
  status: 'WAITING' | 'IN_PRODUCTION' | 'DONE';
  @Prop({
    type: [
      {
        product: {
          type: MongooseSchema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
  })
  products: { product: Product; quantity: number }[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
