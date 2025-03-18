import { useMemo } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectCarts } from "../cart.slice";

export function useSelectedCarts() {
  const carts = useAppSelector(selectCarts);
  return useMemo(() => carts.filter((cart) => cart.selected).map((cart) => cart.product.id), [carts]);
}
