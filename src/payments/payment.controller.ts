import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  private readonly logger = new Logger(PaymentController.name);

  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(@Body() body: { orderId: string; amount: number }) {
    this.logger.log(`Processing payment for order ${body.orderId} with amount ${body.amount}`);
    const result = this.paymentService.createPayment(body.orderId, body.amount);
    this.logger.log(`Payment processed with status: ${result.status}`);
    return result;
  }

  @Get()
  findAll() {
    this.logger.log('Retrieving all payments');
    return this.paymentService.getPayments();
  }
}