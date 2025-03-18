import { useSimpleQuery } from "../../../hooks/api-query/useSimpleQuery";
import { MOCK_USER_DETAILS } from "../../../mock/users";
import { Address } from "../address.model";
import { useUser } from "../../../hooks/useUser";

async function getAddress(userId: string, id: string): Promise<Address> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const match = MOCK_USER_DETAILS.find((user) => user.id === userId)?.addresses?.find((addr) => addr.id === id);
      if (match) {
        resolve(match);
      } else {
        reject();
      }
    }, 1000 + Math.random() * 2000);
  });
}

export function useAddress(id: string) {
  const { data: user } = useUser();
  return useSimpleQuery(["address", id], () => getAddress(user.id, id));
}
