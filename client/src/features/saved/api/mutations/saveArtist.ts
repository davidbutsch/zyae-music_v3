import { axios, queryClient } from "@/libs/";

import { Artist } from "@/features/artists";
import { GenericCard } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useNotification } from "@/providers";

export const saveArtist = (artistId?: string): Promise<GenericCard[]> =>
  axios.post(`/saved/artists/${artistId}`).then((res) => res.data.data.saved);

export const useSaveArtist = () => {
  const { setNotification } = useNotification();

  return useMutation({
    onMutate: async (artist?: Artist | string) => {
      await queryClient.cancelQueries(["saved"]);

      const oldSaved = queryClient.getQueryData<GenericCard[]>(["saved"]);

      if (artist && typeof artist !== "string") {
        queryClient.setQueriesData(
          ["saved"],
          [
            ...(oldSaved || []),
            {
              id: artist.id,
              thumbnails: artist.thumbnails,
              type: "artist",
              title: artist.name,
              sub: `Artist`,
            },
          ]
        );

        setNotification({
          message: `Added to saved`,
          thumbnail: artist.thumbnails[0].url,
        });
      }
      return { oldSaved };
    },
    onError: (_err, _mutationFnParameters, context) => {
      if (context?.oldSaved) {
        queryClient.setQueryData(["saved"], context.oldSaved);
      }
    },
    mutationFn: (artist) =>
      saveArtist(typeof artist === "string" ? artist : artist?.id),
  });
};
