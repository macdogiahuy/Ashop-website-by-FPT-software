import { useSimpleQuery } from "../../../hooks/api-query/useSimpleQuery";
import ms from "ms";
import api from "../../../utils/api";

async function fetchCities(country: string): Promise<string[]> {
  if (!country) {
    return [];
  }

  const response = await api.post("https://countriesnow.space/api/v0.1/countries/cities", {
    country: country,
  });
  const data = response.data;
  return data.error ? [] : data.data;
}

export function useCities(country: string) {
  return useSimpleQuery<string[]>(["cities", country], () => fetchCities(country), {
    cacheTime: ms("1h"),
    staleTime: ms("1h"),
  });
}
