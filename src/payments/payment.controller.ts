import { Controller, Get, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(@Body() body: { orderId: string; amount: number }) {
    return this.paymentService.createPayment(body.orderId, body.amount);
  }

  @Get()
  findAll() {
    return this.paymentService.getPayments();
  }
}