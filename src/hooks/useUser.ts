import ms from "ms";

import { handleRequestError } from "../utils/api";
import { useErrorHandler } from "./api-query/useErrorHandler";
import { useQueryClient } from "@tanstack/react-query";
import { useSimpleQuery } from "./api-query/useSimpleQuery";
import { AuthUser } from "../features/auth/auth.model";
import { TOKEN_KEY } from "../constants";
import { MOCK_USERS } from "../mock/users";

async function fetchAuthenticatedUser(): Promise<AuthUser> {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem(TOKEN_KEY);
    const match = MOCK_USERS.find((user) => user.id === token);
    if (match) {
      resolve(match);
    } else {
      reject({
        response: {
          data: {
            message: "Invalid token",
          },
          status: 403,
        },
      });
    }
  });
}

export function useUser() {
  const errorHandler = useErrorHandler();
  const queryClient = useQueryClient();
  return useSimpleQuery(["user"], fetchAuthenticatedUser, {
    staleTime: ms("2h"),
    cacheTime: ms("4h"),
    silent: true,
    onError: async (err) => {
      const errorDetails = handleRequestError(err as any);
      if (errorDetails.code !== 401) {
        errorHandler(err);
      } else {
        localStorage.removeItem(TOKEN_KEY);
        queryClient.setQueryData(["user"], null);
      }
    },
    retry: (failureCount, error) => {
      const errorDetails = handleRequestError(error as any);
      if (errorDetails.code === 401) {
        return false;
      }
      return failureCount <= 3;
    },
    enabled: !!localStorage.getItem(TOKEN_KEY),
  });
}
