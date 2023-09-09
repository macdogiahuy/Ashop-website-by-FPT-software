import { useSimpleMutation } from "../../../hooks/api-query/useSimpleMutation";
import { useQueryClient } from "@tanstack/react-query";
import { Shop } from "../shop.model";
import { MOCK_SHOPS } from "../../../mock/shops";

async function updateShop(shop: Shop) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = MOCK_SHOPS.findIndex((item) => item.id === shop.id);
      if (index >= 0) {
        MOCK_SHOPS[index] = shop;
      }
      resolve(shop);
    }, 1000);
  });
}

export function useUpdateShop() {
  const queryClient = useQueryClient();
  return useSimpleMutation(["shop"], (data) => updateShop(data), {
    onSettled: async (data) => {
      await queryClient.cancelQueries(["current-shop"]);
      queryClient.setQueryData(["current-shop"], data);
    },
  });
}
