import { Genre } from "../types";
import { axios } from "@/libs/";
import { useQuery } from "@tanstack/react-query";

type getGenreOptions = {
  enabled?: boolean;
};

export const getGenre = (params: string): Promise<Genre> =>
  axios.get(`/genres/${params}`).then((res) => res.data.data.genre);

export const useGenre = (params: string, { enabled }: getGenreOptions = {}) => {
  return useQuery({
    enabled,
    queryKey: ["genre", params],
    queryFn: async () => {
      return getGenre(params);
    },
  });
};
