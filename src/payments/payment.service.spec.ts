import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should create payment and return valid status', () => {
    const result = service.createPayment('order1', 100);
    expect(['APPROVED', 'DECLINED']).toContain(result.status);
    expect(service.getPayments().length).toBe(1);
  });

  it('should get all payments', () => {
    service.createPayment('order1', 100);
    service.createPayment('order2', 200);
    const payments = service.getPayments();
    expect(payments.length).toBe(2);
  });
});