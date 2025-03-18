import { useSimpleQuery } from "../../../hooks/api-query/useSimpleQuery";
import { MOCK_ORDERS } from "../../../mock/orders";
import { Order } from "../../orders/order.model";
import ms from "ms";

async function getOrder(id: string): Promise<Order> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const match = MOCK_ORDERS.find((order) => order.id === id);
      if (match) {
        resolve(match);
      } else {
        reject();
      }
    }, 1000 + Math.random() * 2000);
  });
}

export function useOrder(id: string) {
  return useSimpleQuery(["order", id], () => getOrder(id), {
    staleTime: ms("30s"),
  });
}
