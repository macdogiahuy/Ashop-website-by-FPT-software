import { PaymentMethod } from "../payment/payment.slice";

export type OrderStatus = "purchased" | "shipping" | "arrived" | "received";

export interface Order {
  id: string;
  addressId: string;
  orderedAt: string;
  shippedAt?: string;
  arrivedAt?: string;
  receivedAt?: string;
  products: {
    id: string;
    price: number;
    count: number;
    name: string;
  }[];
  shopId: string;
  shopName: string;
  shippingFee: number;
  logisticId: string;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
}
