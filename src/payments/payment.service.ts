import { Injectable, Logger } from '@nestjs/common';
import { Payment } from './payment.interface';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);
  private payments: Payment[] = [];

  createPayment(orderId: string, amount: number): { status: 'APPROVED' | 'DECLINED' } {
    const id = Date.now().toString();
    const status = Math.random() > 0.5 ? 'APPROVED' : 'DECLINED';
    const payment: Payment = { id, orderId, amount, status };
    this.payments.push(payment);
    this.logger.log(`Payment ${id} created for order ${orderId} with status ${status}`);
    return { status };
  }

  getPayments(): Payment[] {
    this.logger.log(`Retrieving ${this.payments.length} payments`);
    return this.payments;
  }
}