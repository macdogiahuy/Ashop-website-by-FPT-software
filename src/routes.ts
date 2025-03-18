import { ElementType } from "react";
import { HomePage } from "./features/home";
import { LoginPage } from "./features/auth/Login";
import { ProductPage } from "./features/product";
import { CartPage } from "./features/cart";
import { PaymentPage } from "./features/payment";
import { PurchasedPage } from "./features/purchased";
import { OrdersPage } from "./features/orders";
import { OrderPage } from "./features/order";
import { ShopPage } from "./features/shop";
import { MyProductPage } from "./features/my-product";
import { ProfilePage } from "./features/profile";

export type RouteConfig = {
  path?: string;
  exact?: boolean;
  Component: ElementType;
  authRequired?: boolean;
};

export const routes: RouteConfig[] = [
  {
    path: "/",
    exact: true,
    Component: HomePage,
  },
  {
    path: "/login",
    exact: true,
    Component: LoginPage,
  },
  {
    path: "/product/:id",
    exact: true,
    Component: ProductPage,
  },
  {
    path: "/cart",
    exact: true,
    Component: CartPage,
  },
  {
    path: "/payment",
    exact: true,
    Component: PaymentPage,
    authRequired: true,
  },
  {
    path: "/purchased",
    exact: true,
    Component: PurchasedPage,
    authRequired: true,
  },
  {
    path: "/orders",
    exact: true,
    Component: OrdersPage,
    authRequired: true,
  },
  {
    path: "/orders/:id",
    exact: true,
    Component: OrderPage,
    authRequired: true,
  },
  {
    path: "/shop",
    exact: true,
    Component: ShopPage,
    authRequired: true,
  },
  {
    path: "/shop/:id",
    exact: true,
    Component: ShopPage,
    authRequired: true,
  },
  {
    path: "/my-product/:id",
    exact: true,
    Component: MyProductPage,
    authRequired: true,
  },
  {
    path: "/my-product",
    exact: true,
    Component: MyProductPage,
    authRequired: true,
  },
  {
    path: "/profile",
    exact: true,
    Component: ProfilePage,
    authRequired: true,
  },
];
