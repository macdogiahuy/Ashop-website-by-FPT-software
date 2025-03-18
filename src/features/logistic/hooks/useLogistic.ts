import { useSimpleQuery } from "../../../hooks/api-query/useSimpleQuery";
import { Logistic } from "../logistic.model";
import { MOCK_LOGISTICS } from "../../../mock/logistics";

async function getLogistic(id: string): Promise<Logistic> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const match = MOCK_LOGISTICS.find((item) => item.id === id);
      if (match) {
        resolve(match);
      } else {
        reject();
      }
    }, 1000 + Math.random() * 2000);
  });
}

export function useLogistic(id: string) {
  return useSimpleQuery(["logistics", id], () => getLogistic(id));
}
