import { useSimpleMutation } from "../../../hooks/api-query/useSimpleMutation";
import { useQueryClient } from "@tanstack/react-query";
import { MOCK_PRODUCTS } from "../../../mock/products";

async function deleteProduct(id: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = MOCK_PRODUCTS.findIndex((item) => item.id === id);
      if (index >= 0) {
        MOCK_PRODUCTS.splice(index, 1);
      }
      resolve(true);
    }, 1000);
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useSimpleMutation(["products"], (data) => deleteProduct(data.id), {
    onSettled: async (data, error, variables, context) => {
      await queryClient.cancelQueries(["current-shop", "my-products", variables.page]);
      await queryClient.invalidateQueries(["current-shop", "my-products", variables.page]);
    },
  });
}
