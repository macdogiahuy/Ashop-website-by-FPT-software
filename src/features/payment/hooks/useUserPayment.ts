import { useSimpleQuery } from "../../../hooks/api-query/useSimpleQuery";
import { MOCK_USER_PAYMENT } from "../../../mock/users";
import { useUser } from "../../../hooks/useUser";
import { UserPayment } from "../payment.model";

async function getUserPayment(id: string): Promise<UserPayment> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const match = MOCK_USER_PAYMENT.find((userPayment) => userPayment.id === id);
      if (match) {
        resolve(JSON.parse(JSON.stringify(match)));
      } else {
        reject();
      }
    }, 1000 + Math.random() * 2000);
  });
}

export function useUserPayment() {
  const { data } = useUser();
  return useSimpleQuery(["userPayment"], () => getUserPayment(data.id));
}
