export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  status: 'APPROVED' | 'DECLINED';
}