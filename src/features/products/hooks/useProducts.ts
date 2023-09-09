import { MOCK_PRODUCTS } from "../../../mock/products";
import { Product } from "../../product/product.model";
import { useInfinitePageQuery } from "../../../hooks/api-query/useInfinitePageQuery";

async function fetchProducts(skip: number, limit: number): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...MOCK_PRODUCTS].slice(skip, skip + limit));
    }, 1000 + Math.random() * 2000);
  });
}

export function useProducts() {
  return useInfinitePageQuery<Product>(["products"], (skip, limit) => fetchProducts(skip, limit), {
    keepPreviousData: true,
  });
}
