import { MOCK_PRODUCTS } from "../../../mock/products";
import { Product } from "../../product/product.model";
import { useSimpleQuery } from "../../../hooks/api-query/useSimpleQuery";

async function fetchProducts(
  page: number,
  size: number,
  shopId: string
): Promise<{
  items: Product[];
  total: number;
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const skip = (page - 1) * size;
      const filteredItems = MOCK_PRODUCTS.filter((item) => item.shopId === shopId);
      resolve({
        items: [...filteredItems].slice(skip, skip + size),
        total: filteredItems.length,
      });
    }, 1000 + Math.random() * 2000);
  });
}

export function useMyProducts(shopId: string, page: number) {
  return useSimpleQuery(["current-shop", "my-products", page], () => fetchProducts(page, 10, shopId), {
    keepPreviousData: true,
  });
}
