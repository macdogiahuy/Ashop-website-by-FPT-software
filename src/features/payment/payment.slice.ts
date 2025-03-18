import { Product } from "../product/product.model";
import { Logistic } from "../logistic/logistic.model";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Cart } from "../cart/cart.model";
import { Address } from "../address/address.model";

interface PaymentItem {
  product: Product;
  count: number;
  totalPrice: number;
}

export interface PaymentMethod {
  type: string;
  meta: any;
}

export interface PaymentCart {
  id: string;
  items: PaymentItem[];
  message: string;
  logistic?: Logistic;
  totalProductsPrice: number;
  totalPayment: number;
}

export interface PaymentState {
  paymentCarts: PaymentCart[];
  address?: Address;
  paymentMethod?: PaymentMethod;
}

const initialState: PaymentState = {
  paymentCarts: [],
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setupPaymentCarts: (state, { payload }) => {
      const { carts, logistics, paymentMethod } = payload as {
        carts: Cart[];
        logistics: Logistic[];
        paymentMethod: PaymentMethod;
      };

      const cartMap = new Map<string, PaymentCart>();
      for (const cart of carts) {
        if (!cart.selected) {
          continue;
        }

        const product = cart.product;
        if (!cartMap.has(product.shopId)) {
          cartMap.set(product.shopId, {
            id: product.shopId,
            items: [],
            message: "",
            logistic: logistics[0],
            totalProductsPrice: 0,
            totalPayment: 0,
          });
        }

        const paymentCart = cartMap.get(product.shopId);
        const paymentItems = paymentCart.items;
        paymentItems.push({
          product: product,
          count: cart.total,
          totalPrice: cart.total * product.price,
        });

        const totalProductsPrice = paymentItems.reduce((prev, curr) => prev + curr.totalPrice, 0);
        paymentCart.totalProductsPrice = totalProductsPrice;
        paymentCart.totalPayment = totalProductsPrice + (paymentCart.logistic?.price ?? 0);
      }
      state.paymentCarts = Array.from(cartMap.values());

      state.paymentMethod = paymentMethod;
    },
    setLogistic: (state, { payload }) => {
      const { id, logistic } = payload as { id: string; logistic: Logistic };
      const existing = state.paymentCarts.find((paymentCart) => paymentCart.id === id);
      if (existing) {
        existing.logistic = logistic;
        existing.totalPayment = existing.totalProductsPrice + (logistic?.price ?? 0);
      }
    },
    setAddress: (state, { payload }) => {
      state.address = payload;
    },
    setPaymentMethod: (state, { payload }) => {
      state.paymentMethod = payload;
    },
  },
});

export default paymentSlice.reducer;

export const { setupPaymentCarts, setLogistic, setAddress: setPaymentAddress, setPaymentMethod } = paymentSlice.actions;

export const selectPaymentCarts = (state: RootState) => state.payment.paymentCarts;
export const selectPaymentAddress = (state: RootState) => state.payment.address;
export const selectTotalProducts = (state: RootState) =>
  state.payment.paymentCarts.reduce(
    (prev, curr) => prev + curr.items.reduce((prev1, curr1) => prev1 + curr1.count, 0),
    0
  );
export const selectPaymentMethod = (state: RootState) => state.payment.paymentMethod;
