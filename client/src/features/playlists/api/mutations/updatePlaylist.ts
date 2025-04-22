import { axios, queryClient } from "@/libs/";

import { AxiosError } from "axios";
import { Playlist } from "@/features/playlists";
import { useMutation } from "@tanstack/react-query";
import { useNotification } from "@/providers";

type updatedPlaylist = {
  title?: string;
  description?: string;
  public?: boolean;
};

export const updatePlaylist = (
  playlistId: string,
  playlist: updatedPlaylist
): Promise<Playlist> =>
  axios
    .patch(`/playlists/${playlistId}`, { playlist })
    .then((res) => res.data.data.playlist);

export const useUpdatePlaylist = (playlistId: string) => {
  const { setNotification } = useNotification();

  return useMutation({
    onMutate: async (updatedPlaylist) => {
      await queryClient.cancelQueries(["playlist", playlistId]);

      const oldPlaylist = queryClient.getQueryData<Playlist>([
        "playlist",
        playlistId,
      ]);

      queryClient.setQueriesData(["playlist", playlistId], {
        ...oldPlaylist,
        ...updatedPlaylist,
      });

      return { oldPlaylist };
    },
    onError: (_err: AxiosError, _mutationFnParameters, context) => {
      if (context?.oldPlaylist) {
        queryClient.setQueryData(["playlist", playlistId], context.oldPlaylist);
      }

      setNotification({
        message: `Unable to update playlist: ${_err.message}`,
        icon: "fi-rr-exclamation",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["saved"]);
    },
    mutationFn: (updatedPlaylist: updatedPlaylist) =>
      updatePlaylist(playlistId, updatedPlaylist),
  });
};
