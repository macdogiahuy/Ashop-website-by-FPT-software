import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useErrorHandler } from "./useErrorHandler";

export type SimpleQueryOptions<T> = UseQueryOptions<T> & { silent?: boolean };

export function useSimpleQuery<T>(
  queryKey: QueryKey,
  queryFn: (queryKey: QueryKey) => Promise<T>,
  options?: SimpleQueryOptions<T>
) {
  const errorHandler = useErrorHandler();
  const { onError, silent, ...rest } = options || {};
  return useQuery<T>(queryKey, (context) => queryFn(context.queryKey), {
    ...(rest || {}),
    onError: (err) => {
      if (!silent) {
        errorHandler(err);
      }
      if (onError) {
        onError(err);
      }
    },
  });
}
