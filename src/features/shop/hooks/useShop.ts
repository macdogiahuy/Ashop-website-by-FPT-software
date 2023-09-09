import { useSimpleQuery } from "../../../hooks/api-query/useSimpleQuery";
import { Shop } from "../shop.model";
import { MOCK_SHOPS } from "../../../mock/shops";

async function getShop(id: string): Promise<Shop> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const match = MOCK_SHOPS.find((shop) => shop.id === id);
      if (match) {
        resolve(match);
      } else {
        reject("NOT_FOUND");
      }
    }, 1000 + Math.random() * 2000);
  });
}

export function useShop(id: string) {
  return useSimpleQuery(["shop", id], () => getShop(id), {
    retry: (failureCount, error) => {
      if (error === "NOT_FOUND") {
        return false;
      }
      return failureCount < 3;
    },
  });
}
