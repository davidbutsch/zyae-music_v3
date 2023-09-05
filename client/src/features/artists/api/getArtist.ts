import { axios } from "@/libs/";
import { useQuery } from "@tanstack/react-query";

type getArtistOptions = {
  enabled?: boolean;
};

export const getArtist = (artistId: string): Promise<any> =>
  axios.get(`/artist/${artistId}`).then((res) => res.data.data.artist);

export const useArtist = (
  artistId: string,
  { enabled }: getArtistOptions = {}
) => {
  return useQuery({
    enabled,
    queryKey: ["folders", artistId],
    queryFn: async () => {
      return getArtist(artistId);
    },
  });
};
