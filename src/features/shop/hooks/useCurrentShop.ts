import { useSimpleQuery } from "../../../hooks/api-query/useSimpleQuery";
import { Shop } from "../shop.model";
import { MOCK_SHOPS } from "../../../mock/shops";
import { useUser } from "../../../hooks/useUser";

async function getShop(userId: string): Promise<Shop> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const match = MOCK_SHOPS.find((shop) => shop.userId === userId);
      if (match) {
        resolve(match);
      } else {
        reject("NOT_FOUND");
      }
    }, 1000 + Math.random() * 2000);
  });
}

export function useCurrentShop() {
  const { data: user } = useUser();
  return useSimpleQuery(["current-shop"], () => getShop(user.id), {
    retry: (failureCount, error) => {
      if (error === "NOT_FOUND") {
        return false;
      }
      return failureCount < 3;
    },
  });
}
