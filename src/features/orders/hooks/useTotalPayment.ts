import { Order } from "../order.model";
import { useEffect, useState } from "react";
import { useTotalProductPrice } from "./useTotalProductPrice";

export function useTotalPayment(order: Order) {
  const totalProductPrice = useTotalProductPrice(order);
  const [totalPayment, setTotalPayment] = useState<number>();
  useEffect(() => {
    if (order) {
      setTotalPayment(totalProductPrice + order.shippingFee);
    }
  }, [order, totalProductPrice]);

  return totalPayment;
}
