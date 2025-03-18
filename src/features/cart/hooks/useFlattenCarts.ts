import { useAppSelector } from "../../../app/hooks";
import { selectCarts } from "../cart.slice";
import React, { useMemo } from "react";

interface FlattenCart {
  key: React.Key;
  productName: string;
  productThumbnail: string;
  productId: string;
  totalProducts: number;
  unitPrice: number;
  totalPrice: number;
  count: number;
}

export function useFlattenCarts() {
  const carts = useAppSelector(selectCarts);
  return useMemo<FlattenCart[]>(
    () =>
      carts.map((cart) => ({
        key: cart.product.id,
        productName: cart.product.name,
        productId: cart.product.id,
        productThumbnail: cart.product.thumbnail,
        unitPrice: cart.product.price,
        count: cart.total,
        totalProducts: cart.product.totalAvailable,
        totalPrice: cart.product.price * cart.total,
      })),
    [carts]
  );
}
