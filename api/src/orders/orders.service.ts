import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from 'src/app/models/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderModel
      .find()
      .sort({ createdAt: 1 })
      .populate('products.product')
      .exec();
  }

  async create(data: CreateOrderDto): Promise<Order> {
    return this.orderModel.create(data);
  }

  async updateStatus(orderId: string, status: string): Promise<void> {
    await this.orderModel.findByIdAndUpdate(orderId, { status });
  }

  async deleteOrder(orderId: string): Promise<boolean> {
    const result = await this.orderModel.findByIdAndDelete(orderId);
    return !!result;
  }
}
