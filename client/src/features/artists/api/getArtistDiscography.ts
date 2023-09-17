import { ArtistDiscography } from "@/features/artists";
import { axios } from "@/libs/";
import { useQuery } from "@tanstack/react-query";

type getArtistOptions = {
  enabled?: boolean;
};

export const getArtistDiscography = (
  artistId: string
): Promise<ArtistDiscography> =>
  axios
    .get(`/artists/${artistId}/discography`)
    .then((res) => res.data.data.discography);

export const useArtistDiscography = (
  artistId: string,
  { enabled }: getArtistOptions = {}
) => {
  return useQuery({
    enabled,
    queryKey: ["artist", artistId, "discography"],
    queryFn: async () => {
      return getArtistDiscography(artistId);
    },
  });
};
