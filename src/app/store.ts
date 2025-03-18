import { Action, combineReducers, configureStore, getDefaultMiddleware, ThunkAction } from "@reduxjs/toolkit";
import { QueryClient } from "@tanstack/react-query";
import ms from "ms";
import { PersistConfig, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartReducer from "../features/cart/cart.slice";
import paymentReducer from "../features/payment/payment.slice";

import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist/es/constants";

const reducers = combineReducers({
  cart: cartReducer,
  payment: paymentReducer,
});

const persistConfig: PersistConfig<any> = {
  key: "root",
  storage,
  blacklist: ["payment"],
  debug: process.env.NODE_ENV === "development",
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof reducers>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: ms("5m"),
      cacheTime: ms("10m"),
    },
  },
});
