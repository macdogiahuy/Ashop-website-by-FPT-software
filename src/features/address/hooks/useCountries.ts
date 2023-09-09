import { useSimpleQuery } from "../../../hooks/api-query/useSimpleQuery";
import ms from "ms";
import api from "../../../utils/api";

async function fetchCountries(): Promise<string[]> {
  const response = await api.get("https://countriesnow.space/api/v0.1/countries/positions");
  const data = response.data;
  return data.error ? [] : data.data.map((item) => item.name);
}

export function useCountries() {
  return useSimpleQuery<string[]>(["countries"], () => fetchCountries(), {
    keepPreviousData: true,
    cacheTime: ms("24h"),
    staleTime: ms("24h"),
  });
}
