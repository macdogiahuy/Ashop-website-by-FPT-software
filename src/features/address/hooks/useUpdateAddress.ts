import { useSimpleMutation } from "../../../hooks/api-query/useSimpleMutation";
import { MOCK_USER_DETAILS } from "../../../mock/users";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "../../../hooks/useUser";
import { Address } from "../address.model";
import { UserDetails } from "../../user/user.model";

async function updateAddress(userId: string, data: Address) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const match = MOCK_USER_DETAILS.find((user) => user.id === userId);
      if (match) {
        match.addresses = match.addresses.map((addr) => (addr.id === data.id ? data : addr));
        match.defaultAddressId = data.isDefault ? data.id : match.defaultAddressId;
        resolve(data);
      } else {
        reject();
      }
    }, 1000 + Math.random() * 1000);
  });
}

export function useUpdateAddress() {
  const queryClient = useQueryClient();
  const { data: user } = useUser();
  return useSimpleMutation(["userDetails"], (data) => updateAddress(user.id, data), {
    onSuccess: async (data: Address) => {
      if (data) {
        await queryClient.cancelQueries(["userDetails"]);
        const previousData = queryClient.getQueryData<UserDetails>(["userDetails"]);
        if (previousData) {
          const newUserDetails: UserDetails = {
            ...previousData,
            addresses: previousData.addresses.map((addr) => (addr.id === data.id ? data : addr)),
            defaultAddressId: data.isDefault ? data.id : previousData.defaultAddressId,
          };
          queryClient.setQueryData(["userDetails"], newUserDetails);
          await queryClient.cancelQueries(["address"]);
          await queryClient.invalidateQueries(["address"]);
        }
      }
    },
  });
}
