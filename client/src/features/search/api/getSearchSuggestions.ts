import { SearchSuggestions } from "@/features/search";
import { axios } from "@/libs/";
import { useQuery } from "@tanstack/react-query";

type getSearchSuggestionsOptions = {
  enabled?: boolean;
};

export const getSearchSuggestions = (
  query: string
): Promise<SearchSuggestions> =>
  axios
    .get(`/search/${query}/suggestions`)
    .then((res) => res.data.data.suggestions);

export const useSearchSuggestions = (
  query: string,
  { enabled }: getSearchSuggestionsOptions = {}
) => {
  return useQuery({
    enabled,
    queryKey: ["searchSuggestions", query],
    queryFn: async () => {
      return getSearchSuggestions(query);
    },
  });
};
