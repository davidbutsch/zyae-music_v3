import { axios, queryClient } from "@/libs/";

import { AxiosError } from "axios";
import { Playlist } from "@/features/playlists";
import { Track } from "@/features/tracks";
import { useMutation } from "@tanstack/react-query";
import { useNotification } from "@/providers";

export const addToPlaylist = (
  playlistId: string,
  track: string | Track
): Promise<Playlist> =>
  axios
    .post(`/playlists/${playlistId}/tracks`, { track })
    .then((res) => res.data.data.playlist);

export const useAddToPlaylist = (playlistId: string) => {
  const { setNotification } = useNotification();

  return useMutation({
    onMutate: async (track: string | Track) => {
      await queryClient.cancelQueries(["playlist", playlistId]);

      const oldPlaylist = queryClient.getQueryData<Playlist>([
        "playlist",
        playlistId,
      ]);

      if (typeof track !== "string" && Boolean(oldPlaylist)) {
        queryClient.setQueriesData(["playlist", playlistId], {
          ...oldPlaylist,
          tracks: [track, ...(oldPlaylist?.tracks || [])],
        });

        setNotification({
          message: `Added to ${oldPlaylist?.title}`,
          thumbnail: oldPlaylist?.thumbnails[0].url,
        });
      }

      return { oldPlaylist };
    },
    onError: (_err: AxiosError, _mutationFnParameters) => {
      setNotification({
        message: `Unable to update playlist: ${_err.message}`,
        icon: "fi-rr-exclamation",
      });
    },
    mutationFn: (track) => addToPlaylist(playlistId, track),
  });
};
