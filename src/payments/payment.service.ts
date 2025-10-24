import { Injectable } from '@nestjs/common';
import { Payment } from './payment.interface';

@Injectable()
export class PaymentService {
  private payments: Payment[] = [];

  createPayment(orderId: string, amount: number): { status: 'APPROVED' | 'DECLINED' } {
    const id = Date.now().toString();
    const status = Math.random() > 0.5 ? 'APPROVED' : 'DECLINED';
    const payment: Payment = { id, orderId, amount, status };
    this.payments.push(payment);
    return { status };
  }

  getPayments(): Payment[] {
    return this.payments;
  }
}