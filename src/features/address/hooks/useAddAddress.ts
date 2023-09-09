import { useSimpleMutation } from "../../../hooks/api-query/useSimpleMutation";
import { MOCK_USER_DETAILS } from "../../../mock/users";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "../../../hooks/useUser";
import { Address } from "../address.model";
import { UserDetails } from "../../user/user.model";
import { v4 as uuidv4 } from "uuid";

async function addAddress(userId: string, data: Address) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const match = MOCK_USER_DETAILS.find((user) => user.id === userId);
      if (match) {
        const newAddress: Address = {
          ...data,
          id: uuidv4(),
        };
        match.addresses.push(newAddress);
        match.defaultAddressId = newAddress.isDefault ? newAddress.id : match.defaultAddressId;
        resolve(newAddress);
      } else {
        reject();
      }
    }, 1000 + Math.random() * 1000);
  });
}

export function useAddAddress() {
  const queryClient = useQueryClient();
  const { data: user } = useUser();
  return useSimpleMutation(["userDetails"], (data) => addAddress(user.id, data), {
    onSuccess: async (data: Address) => {
      if (data) {
        await queryClient.cancelQueries(["userDetails"]);
        const previousData = queryClient.getQueryData<UserDetails>(["userDetails"]);
        if (previousData) {
          const newUserDetails: UserDetails = {
            ...previousData,
            addresses: [...previousData.addresses, data],
            defaultAddressId: data.isDefault ? data.id : previousData.defaultAddressId,
          };
          queryClient.setQueryData(["userDetails"], newUserDetails);
        }
      }
    },
  });
}
