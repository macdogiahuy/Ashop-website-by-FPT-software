import { MOCK_PRODUCTS } from "../../../mock/products";
import { Product } from "../../product/product.model";
import { useInfinitePageQuery } from "../../../hooks/api-query/useInfinitePageQuery";

async function fetchProducts(shopId: string, skip: number, limit: number): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...MOCK_PRODUCTS].filter((item) => item.shopId === shopId).slice(skip, skip + limit));
    }, 1000 + Math.random() * 2000);
  });
}

export function useShopProducts(shopId: string) {
  return useInfinitePageQuery<Product>(["shop-products"], (skip, limit) => fetchProducts(shopId, skip, limit), {
    keepPreviousData: true,
  });
}
