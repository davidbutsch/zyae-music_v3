import { axios, queryClient } from "@/libs/";

import { GenericCard } from "@/types";
import { Playlist } from "@/features/playlists";
import { useMutation } from "@tanstack/react-query";
import { useNotification } from "@/providers";

export const savePlaylist = (playlistId?: string): Promise<GenericCard[]> =>
  axios
    .post(`/saved/playlists/${playlistId}`)
    .then((res) => res.data.data.saved);

export const useSavePlaylist = () => {
  const { setNotification } = useNotification();

  return useMutation({
    onMutate: async (playlist?: Playlist | string) => {
      await queryClient.cancelQueries(["saved"]);

      const oldSaved = queryClient.getQueryData<GenericCard[]>(["saved"]);

      if (playlist && typeof playlist !== "string") {
        queryClient.setQueriesData(
          ["saved"],
          [
            ...(oldSaved || []),
            {
              id: playlist.id,
              thumbnails: playlist.thumbnails,
              type: "playlist",
              title: playlist.title,
              sub: `Playlist • ${playlist.author.name}`,
            },
          ]
        );

        setNotification({
          message: `Added to saved`,
          thumbnail: playlist.thumbnails[0].url,
        });
      }

      return { oldSaved };
    },
    onError: (_err, _mutationFnParameters, context) => {
      if (context?.oldSaved) {
        queryClient.setQueryData(["saved"], context.oldSaved);
      }
    },
    mutationFn: (playlist) =>
      savePlaylist(typeof playlist === "string" ? playlist : playlist?.id),
  });
};
