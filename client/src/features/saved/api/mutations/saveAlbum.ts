import { axios, queryClient } from "@/libs/";

import { Album } from "@/features/albums";
import { GenericCard } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useNotification } from "@/providers";

export const saveAlbum = (albumId?: string): Promise<GenericCard[]> =>
  axios.post(`/saved/albums/${albumId}`).then((res) => res.data.data.saved);

export const useSaveAlbum = () => {
  const { setNotification } = useNotification();

  return useMutation({
    onMutate: async (album?: Album | string) => {
      await queryClient.cancelQueries(["saved"]);

      const oldSaved = queryClient.getQueryData<GenericCard[]>(["saved"]);

      if (album && typeof album !== "string") {
        queryClient.setQueriesData(
          ["saved"],
          [
            ...(oldSaved || []),
            {
              id: album.id,
              thumbnails: album.thumbnails,
              type: "album",
              title: album.title,
              sub: `Album ${
                album.artists[0].name ? `• ${album.artists[0].name}` : ""
              }`,
            },
          ]
        );

        setNotification({
          message: `Added to saved`,
          thumbnail: album.thumbnails[0].url,
        });
      }

      return { oldSaved };
    },
    onError: (_err, _mutationFnParameters, context) => {
      if (context?.oldSaved) {
        queryClient.setQueryData(["saved"], context.oldSaved);
      }
    },
    mutationFn: (album) =>
      saveAlbum(typeof album === "string" ? album : album?.id),
  });
};
