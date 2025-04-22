import { Artist } from "@/features/artists";
import { axios } from "@/libs/";
import { useQuery } from "@tanstack/react-query";

type getArtistOptions = {
  enabled?: boolean;
};

export const getArtist = (artistId: string): Promise<Artist> =>
  axios.get(`/artists/${artistId}`).then((res: any) => res.data.data.artist);

export const useArtist = (
  artistId: string,
  { enabled }: getArtistOptions = {}
) => {
  return useQuery({
    enabled,
    queryKey: ["artist", artistId],
    queryFn: async () => {
      return getArtist(artistId);
    },
  });
};
