import { GenericCard } from "@/types";
import { axios } from "@/libs/";
import { useQuery } from "@tanstack/react-query";

export const getSavedQueryResults = (query: string): Promise<GenericCard[]> =>
  axios.get(`/saved/${query}`).then((res) => res.data.data.results);

export const useSavedQueryResults = (
  query: string,
  queryOptions?: { enabled: boolean }
) => {
  return useQuery({
    queryKey: ["savedResults", query],
    queryFn: async () => {
      return getSavedQueryResults(query);
    },
    ...queryOptions,
  });
};
