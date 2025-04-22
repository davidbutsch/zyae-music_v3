import { axios, queryClient } from "@/libs/";

import { Playlist } from "@/features/playlists";
import { useMutation } from "@tanstack/react-query";
import { useNotification } from "@/providers";

export const removeFromPlaylist = (
  playlistId: string,
  trackId: string
): Promise<Playlist> =>
  axios
    .delete(`/playlists/${playlistId}/tracks/${trackId}`)
    .then((res) => res.data.data.playlist);

export const useRemoveFromPlaylist = (playlistId: string) => {
  const { setNotification } = useNotification();

  return useMutation({
    onMutate: async (trackId: string) => {
      await queryClient.cancelQueries(["playlist", playlistId]);

      const oldPlaylist = queryClient.getQueryData<Playlist>([
        "playlist",
        playlistId,
      ]);

      queryClient.setQueriesData(["playlist", playlistId], {
        ...oldPlaylist,
        tracks: oldPlaylist?.tracks.filter((track) => track.id !== trackId),
      });

      setNotification({
        message: `Removed from ${oldPlaylist?.title}`,
        thumbnail: oldPlaylist?.thumbnails[0].url,
      });

      return { oldPlaylist };
    },
    onError: (_err, _trackId, context) => {
      if (context?.oldPlaylist) {
        queryClient.setQueryData(["playlist", playlistId], context.oldPlaylist);
      }
    },
    mutationFn: (trackId) => removeFromPlaylist(playlistId, trackId),
  });
};
