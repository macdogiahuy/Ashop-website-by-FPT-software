import { useMemo } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectCarts } from "../cart.slice";
import { useSelectedCarts } from "./useSelectedCarts";

export function useTotalPayment() {
  const carts = useAppSelector(selectCarts);
  const selectedKeys = useSelectedCarts();
  return useMemo(() => {
    let total = 0;
    for (const key of selectedKeys) {
      const cart = carts.find((cart) => cart.product.id === key);
      if (cart) {
        total += cart.total * cart.product.price;
      }
    }
    return total;
  }, [carts, selectedKeys]);
}
