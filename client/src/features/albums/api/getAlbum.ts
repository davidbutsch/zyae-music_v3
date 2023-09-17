import { Album } from "@/features/albums";
import { axios } from "@/libs/";
import { useQuery } from "@tanstack/react-query";

type getAlbumOptions = {
  enabled?: boolean;
};

export const getAlbum = (albumId: string): Promise<Album> =>
  axios.get(`/albums/${albumId}`).then((res) => res.data.data.album);

export const useAlbum = (
  albumId: string,
  { enabled }: getAlbumOptions = {}
) => {
  return useQuery({
    enabled,
    queryKey: ["album", albumId],
    queryFn: async () => {
      return getAlbum(albumId);
    },
  });
};
