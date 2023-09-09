import { QueryKey, useInfiniteQuery, UseInfiniteQueryOptions } from "@tanstack/react-query";
import { useErrorHandler } from "./useErrorHandler";

const MAX_STORIES_PER_PAGE = 10;

export function useInfinitePageQuery<T>(
  queryKey: QueryKey,
  queryFn: (skip: number, limit: number, queryKey?: readonly any[]) => Promise<T[]>,
  options?: UseInfiniteQueryOptions<T[]> & { silent?: boolean },
  itemPerPage?: number
) {
  const max = itemPerPage === undefined ? MAX_STORIES_PER_PAGE : itemPerPage;
  const errorHandler = useErrorHandler();
  const { onError, silent, ...rest } = options || {};
  return useInfiniteQuery<T[]>(queryKey, ({ pageParam = 0, queryKey }) => queryFn(pageParam * max, max, queryKey), {
    ...rest,
    getNextPageParam: (lastPage, allPages) =>
      lastPage === undefined ? 0 : lastPage.length > 0 ? allPages.length : false,
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
