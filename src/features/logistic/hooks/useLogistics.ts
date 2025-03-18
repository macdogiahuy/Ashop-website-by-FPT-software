import ms from "ms";
import { Logistic } from "../logistic.model";
import { useSimpleQuery } from "../../../hooks/api-query/useSimpleQuery";
import { MOCK_LOGISTICS } from "../../../mock/logistics";

async function fetchLogistics(): Promise<Logistic[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...MOCK_LOGISTICS]);
    }, 1000 + Math.random() * 2000);
  });
}

export function useLogistics() {
  return useSimpleQuery<Logistic[]>(["logistics"], () => fetchLogistics(), {
    keepPreviousData: true,
    cacheTime: ms("1h"),
    staleTime: ms("1h"),
  });
}
