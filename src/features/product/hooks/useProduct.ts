import { useSimpleQuery } from "../../../hooks/api-query/useSimpleQuery";
import { Product } from "../product.model";
import { MOCK_PRODUCTS } from "../../../mock/products";

async function getProduct(id: string): Promise<Product> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const match = MOCK_PRODUCTS.find((product) => product.id === id);
      if (match) {
        resolve(match);
      } else {
        reject();
      }
    }, 1000 + Math.random() * 2000);
  });
}

export function useProduct(id: string) {
  return useSimpleQuery(["product", id], () => getProduct(id));
}
