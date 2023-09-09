import { useSimpleQuery } from "../../../hooks/api-query/useSimpleQuery";
import { Category } from "../category.model";
import { MOCK_CATEGORIES } from "../../../mock/categories";
import ms from "ms";

async function getCategories(): Promise<Category[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CATEGORIES);
    }, 1000);
  });
}

export function useCategories() {
  return useSimpleQuery(["categories"], () => getCategories(), {
    staleTime: ms("24h"),
    cacheTime: ms("24h"),
  });
}
