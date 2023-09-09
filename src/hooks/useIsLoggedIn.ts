import { useUser } from "./useUser";

export function useIsLoggedIn() {
  const { data: user, isLoading, isFetching } = useUser();
  return { isLoggedIn: !!user && !!user.id, isLoading, isFetching };
}
