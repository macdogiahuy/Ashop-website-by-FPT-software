import { useSimpleQuery } from "../../../hooks/api-query/useSimpleQuery";
import { UserDetails } from "../user.model";
import { MOCK_USER_DETAILS } from "../../../mock/users";
import { useUser } from "../../../hooks/useUser";

async function getUserDetails(id: string): Promise<UserDetails> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const match = MOCK_USER_DETAILS.find((userDetails) => userDetails.id === id);
      if (match) {
        resolve(JSON.parse(JSON.stringify(match)));
      } else {
        reject();
      }
    }, 1000 + Math.random() * 2000);
  });
}

export function useUserDetails() {
  const { data } = useUser();
  return useSimpleQuery(["userDetails"], () => getUserDetails(data.id));
}
