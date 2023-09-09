import { TOKEN_KEY } from "../../../constants";
import { useSimpleMutation } from "../../../hooks/api-query/useSimpleMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "../../../app/hooks";
import { resetCart } from "../../cart/cart.slice";
import { useHistory } from "react-router-dom";

async function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export function useLogout() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const history = useHistory();
  return useSimpleMutation<void>(["logout"], logout, {
    onSettled: async () => {
      dispatch(resetCart());
      history.push("/");
      await queryClient.resetQueries({ predicate: () => true });
    },
  });
}
