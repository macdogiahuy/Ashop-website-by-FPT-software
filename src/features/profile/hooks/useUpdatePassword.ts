import { useSimpleMutation } from "../../../hooks/api-query/useSimpleMutation";
import { MOCK_USERS } from "../../../mock/users";

async function updatePassword(userId: string, passwordData: { oldPassword: string; newPassword: string }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const found = MOCK_USERS.find((user) => user.id === userId);
      if (found) {
        if (found.password === passwordData.oldPassword && passwordData.newPassword) {
          found.password = passwordData.newPassword;
          resolve(true);
        } else {
          reject("ACCESS_DENIED");
        }
      } else {
        reject("NOT_FOUND");
      }
    }, 1000);
  });
}

export function useUpdatePassword() {
  return useSimpleMutation(["user"], (data) => updatePassword(data.userId, data.passwordData));
}
