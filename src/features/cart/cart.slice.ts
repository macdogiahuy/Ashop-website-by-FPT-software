import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Cart } from "./cart.model";

export interface CartState {
  carts: Cart[];
}

const initialState: CartState = {
  carts: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: (state) => {
      state.carts = [];
    },
    clearCart: (state) => {
      state.carts = [];
    },
    updateCart: (state, { payload }) => {
      const { productId, total } = payload;
      const existingCart = state.carts.find((cart) => cart.product.id === productId);
      if (existingCart) {
        if (total > 0) {
          existingCart.total = total;
        } else {
          state.carts = state.carts.filter((cart) => cart.product.id !== existingCart.product.id);
        }
      }
    },
    addToCart: (state, { payload }) => {
      const { product, total } = payload;
      const existingCart = state.carts.find((cart) => cart.product.id === product.id);
      const newTotal = (existingCart?.total ?? 0) + total;
      if (newTotal > product.total) {
        return;
      }
      if (existingCart) {
        existingCart.total += total;
      } else {
        state.carts.push({ product: product, total: total, selected: true });
      }
    },
    removeFromCart: (state, { payload }) => {
      const { product, total } = payload;
      const existingCart = state.carts.find((cart) => cart.product.id === product.id);
      if (existingCart) {
        existingCart.total -= total;
        if (existingCart.total <= 0) {
          state.carts = state.carts.filter((cart) => cart.product.id !== existingCart.product.id);
        }
      }
    },
    buyNow: (state, { payload }) => {
      const { product, total } = payload;
      const existingCart = state.carts.find((cart) => cart.product.id === product.id);
      if (existingCart) {
        existingCart.total += total;
        existingCart.selected = true;
      } else {
        state.carts.push({ product: product, total: total, selected: true });
      }
      // state.carts.forEach((cart) => {
      //   cart.selected = cart.product.id === product.id;
      // });
    },
    chooseCarts: (state, { payload }) => {
      const selectedIds = payload as string[];
      state.carts = state.carts.map((cart) => ({ ...cart, selected: selectedIds.includes(cart.product.id) }));
    },
    cleanupCarts: (state) => {
      state.carts = state.carts.filter((cart) => !cart.selected);
    },
  },
});

export const { removeFromCart, addToCart, buyNow, resetCart, clearCart, updateCart, chooseCarts, cleanupCarts } =
  cartSlice.actions;

export default cartSlice.reducer;

export const selectCarts = (state: RootState) => state.cart.carts;
