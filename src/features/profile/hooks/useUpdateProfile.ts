import { useSimpleMutation } from "../../../hooks/api-query/useSimpleMutation";
import { MOCK_USERS } from "../../../mock/users";
import { AuthUser } from "../../auth/auth.model";
import { useQueryClient } from "@tanstack/react-query";

async function updateProfile(user: AuthUser) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = MOCK_USERS.findIndex((item) => item.id === user.id);
      if (index >= 0) {
        const updatedUser = {
          ...MOCK_USERS[index],
          ...user,
        };
        MOCK_USERS[index] = updatedUser;
        resolve(updatedUser);
      } else {
        reject();
      }
    }, 1000);
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useSimpleMutation(["user"], (data) => updateProfile(data), {
    onSettled: async (data) => {
      await queryClient.cancelQueries(["user"]);
      queryClient.setQueryData(["user"], data);
    },
  });
}
