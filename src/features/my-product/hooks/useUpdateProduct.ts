import { useSimpleMutation } from "../../../hooks/api-query/useSimpleMutation";
import { useQueryClient } from "@tanstack/react-query";
import { MOCK_PRODUCTS } from "../../../mock/products";
import { Product } from "../../product/product.model";

async function updateProduct(product: Product) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = MOCK_PRODUCTS.findIndex((item) => item.id === product.id);
      if (index >= 0) {
        MOCK_PRODUCTS[index] = product;
      }
      resolve(product);
    }, 1000);
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useSimpleMutation(["products"], (data) => updateProduct(data), {
    onSettled: async (data) => {
      await queryClient.cancelQueries(["current-shop", "my-products"]);
      await queryClient.invalidateQueries(["current-shop", "my-products"]);

      await queryClient.cancelQueries(["product", data.id]);
      await queryClient.setQueryData(["product", data.id], data);
    },
  });
}
