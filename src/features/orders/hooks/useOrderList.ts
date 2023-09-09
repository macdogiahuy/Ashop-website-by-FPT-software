import { useInfinitePageQuery } from "../../../hooks/api-query/useInfinitePageQuery";
import { Order, OrderStatus } from "../order.model";
import { MOCK_ORDERS } from "../../../mock/orders";
import ms from "ms";

async function fetchOrderList(skip: number, limit: number, status: OrderStatus, searchText: string): Promise<Order[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        [...MOCK_ORDERS]
          .filter(
            (item) =>
              (!status || item.status === status) &&
              (!searchText ||
                item.products.some((product) => product.name.toLowerCase().includes(searchText.toLowerCase())))
          )
          .slice(skip, skip + limit)
      );
    }, 1000 + Math.random() * 2000);
  });
}

export function useOrderList(status: OrderStatus, searchText: string) {
  return useInfinitePageQuery<Order>(
    ["orders", status ?? "", searchText],
    (skip, limit) => fetchOrderList(skip, limit, status, searchText),
    {
      staleTime: ms("1m"),
    }
  );
}
