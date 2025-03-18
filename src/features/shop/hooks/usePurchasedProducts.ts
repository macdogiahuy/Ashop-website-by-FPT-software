import { MOCK_PRODUCTS } from "../../../mock/products";
import { Product } from "../../product/product.model";
import { useSimpleQuery } from "../../../hooks/api-query/useSimpleQuery";
import { MOCK_ORDERS } from "../../../mock/orders";

type PurchasedProduct = Product & {
  orderedCount: number;
  orderedAt: string;
};

async function fetchProducts(
  page: number,
  size: number,
  shopId: string
): Promise<{
  items: PurchasedProduct[];
  total: number;
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const skip = (page - 1) * size;
      const filteredItems: PurchasedProduct[] = MOCK_ORDERS.filter((item) => item.shopId === shopId)
        .flatMap((order) => order.products.map((item) => ({ ...item, orderedAt: order.orderedAt })))
        .map((item) => {
          const found = MOCK_PRODUCTS.find((product) => product.id === item.id);
          return found
            ? {
                ...found,
                price: item.price,
                orderedCount: item.count,
                orderedAt: item.orderedAt,
              }
            : null;
        })
        .filter(Boolean);
      resolve({
        items: [...filteredItems].slice(skip, skip + size),
        total: filteredItems.length,
      });
    }, 1000 + Math.random() * 2000);
  });
}

export function usePurchasedProducts(shopId: string, page: number) {
  return useSimpleQuery(["current-shop", "purchased-products", page], () => fetchProducts(page, 10, shopId), {
    keepPreviousData: true,
    refetchOnMount: "always",
  });
}
