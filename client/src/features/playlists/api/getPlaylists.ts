import { Playlist } from "@/features/playlists";
import { axios } from "@/libs/";
import { useQuery } from "@tanstack/react-query";

type getPlaylistOptions = {
  enabled?: boolean;
};

export const getPlaylist = (playlistId: string): Promise<Playlist> =>
  axios.get(`/playlists/${playlistId}`).then((res) => res.data.data.playlist);

export const usePlaylist = (
  playlistId: string,
  { enabled }: getPlaylistOptions = {}
) => {
  return useQuery({
    enabled,
    queryKey: ["playlist", playlistId],
    queryFn: async () => {
      return getPlaylist(playlistId);
    },
  });
};
