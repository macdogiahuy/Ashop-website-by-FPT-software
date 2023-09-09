import { useSimpleMutation } from "../../../hooks/api-query/useSimpleMutation";
import { UserPassLogin } from "../auth.model";
import { TOKEN_KEY } from "../../../constants";
import { MOCK_USERS } from "../../../mock/users";
import { useHistory, useLocation } from "react-router-dom";

async function login(data: UserPassLogin) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const match = MOCK_USERS.find((user) => user.username === data.username && user.password === data.password);
      if (match) {
        resolve(match.id);
      } else {
        reject();
      }
    }, 1000 + Math.random() * 1000);
  });
}

export function useLogin() {
  const history = useHistory();
  const location = useLocation<any>();
  const prevPath = location.state?.prevPathName || "/";
  return useSimpleMutation(["login"], (data) => login(data), {
    onSuccess: async (data) => {
      if (data) {
        localStorage.setItem(TOKEN_KEY, data);
        history.push(prevPath);
      }
    },
  });
}
