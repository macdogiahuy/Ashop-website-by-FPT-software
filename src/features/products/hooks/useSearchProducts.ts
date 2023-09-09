import { useSimpleQuery } from "../../../hooks/api-query/useSimpleQuery";
import { MOCK_PRODUCTS } from "../../../mock/products";
import ms from "ms";
import { Product } from "../../product/product.model";

async function search(text: string): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowercaseText = text.toLowerCase();
      const result = lowercaseText
        ? MOCK_PRODUCTS.filter((product) => product.name.toLowerCase().includes(lowercaseText))
        : [];
      resolve(result);
    }, 500 + Math.random() * 1000);
  });
}

export function useSearchProducts(text: string) {
  return useSimpleQuery<Product[]>(["search", text], () => search(text), {
    cacheTime: ms("1m"),
    enabled: true,
  });
}
