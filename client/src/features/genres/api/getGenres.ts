import { GenreCard } from "..";
import { axios } from "@/libs/";
import { useQuery } from "@tanstack/react-query";

type getGenresOptions = {
  enabled?: boolean;
};

export const getGenres = (): Promise<GenreCard[]> =>
  axios.get(`/genres/`).then((res) => res.data.data.genres);

export const useGenres = ({ enabled }: getGenresOptions = {}) => {
  return useQuery({
    enabled,
    queryKey: ["genres"],
    queryFn: async () => {
      return getGenres();
    },
  });
};
