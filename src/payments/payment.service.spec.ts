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

  it('should create payment and return APPROVED when random > 0.5', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.6);
    const result = service.createPayment('order1', 100);
    expect(result.status).toBe('APPROVED');
    const payments = service.getPayments();
    expect(payments.length).toBe(1);
    expect(payments[0]).toEqual({ id: expect.any(String), orderId: 'order1', amount: 100, status: 'APPROVED' });
    jest.restoreAllMocks();
  });

  it('should create payment and return DECLINED when random <= 0.5', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.4);
    const result = service.createPayment('order1', 100);
    expect(result.status).toBe('DECLINED');
    const payments = service.getPayments();
    expect(payments.length).toBe(1);
    expect(payments[0]).toEqual({ id: expect.any(String), orderId: 'order1', amount: 100, status: 'DECLINED' });
    jest.restoreAllMocks();
  });

  it('should create payment and return DECLINED when random = 0.5', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    const result = service.createPayment('order1', 100);
    expect(result.status).toBe('DECLINED');
    jest.restoreAllMocks();
  });
});