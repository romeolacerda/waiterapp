import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Order } from 'src/app/models/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Post()
  create(@Body() data: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(data);
  }

  @Patch(':orderId')
  async changeOrderStatus(
    @Param('orderId') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const { status } = updateOrderDto;

    if (!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status as string)) {
      throw new HttpException(
        { error: 'Status should be WAITING, IN_PRODUCTION, or DONE' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.ordersService.updateStatus(orderId, status as string);
  }

  @Delete(':orderId')
  async cancelOrder(@Param('orderId') orderId: string) {
    return this.ordersService.deleteOrder(orderId);
  }
}
