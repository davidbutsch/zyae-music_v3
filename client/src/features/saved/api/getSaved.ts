import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { GenericCard } from "@/types";
import { axios } from "@/libs/";

export const getSaved = (): Promise<GenericCard[]> =>
  axios.get(`/saved/`).then((res) => res.data.data.saved);

export const useSaved = (queryOptions?: UseQueryOptions<GenericCard[]>) => {
  return useQuery({
    queryKey: ["saved"],
    queryFn: async () => {
      return getSaved();
    },
    ...queryOptions,
  });
};
