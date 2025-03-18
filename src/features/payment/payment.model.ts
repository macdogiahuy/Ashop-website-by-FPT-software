import { PaymentMethod } from "./payment.slice";

export interface CreditCard {
  id: string;
  number: string;
  exp: string;
  cvv: string;
  ownerName: string;
}

export type CreditPaymentMethod = {
  cards: CreditCard[];
  type: "credit";
};

export type CODPaymentMethod = {
  type: "cod";
};

export type PaymentMethodType = CreditPaymentMethod | CODPaymentMethod;

export interface UserPayment {
  id: string;
  methods: PaymentMethodType[];
  lastUsed: "credit" | "cod";
}

interface PlaceOrderCart {
  logisticId: string;
  message: string;
  products: {
    id: string;
    count: number;
  }[];
}

export interface PlaceOrderInfo {
  carts: PlaceOrderCart[];
  addressId: string;
  paymentMethod: PaymentMethod;
}
