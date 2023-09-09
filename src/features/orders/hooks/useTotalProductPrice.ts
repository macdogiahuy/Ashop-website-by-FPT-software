import { Order } from "../order.model";
import { useEffect, useState } from "react";

export function useTotalProductPrice(order: Order) {
  const [totalPrice, setTotalPrice] = useState<number>();
  useEffect(() => {
    if (order) {
      const totalPrice = order.products.reduce((prev, curr) => prev + curr.price * curr.count, 0);
      setTotalPrice(totalPrice);
    }
  }, [order]);

  return totalPrice;
}
