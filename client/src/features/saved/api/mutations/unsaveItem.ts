import { axios, queryClient } from "@/libs/";

import { GenericCard } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useNotification } from "@/providers";

export const unsaveItem = (itemId?: string): Promise<GenericCard[]> =>
  axios.delete(`/saved/${itemId}`).then((res) => res.data.data.saved);

export const useUnsaveItem = () => {
  const { setNotification } = useNotification();

  return useMutation({
    onMutate: async (itemId?: string) => {
      await queryClient.cancelQueries(["saved"]);

      const oldSaved = queryClient.getQueryData<GenericCard[]>(["saved"]);

      queryClient.setQueriesData(
        ["saved"],
        oldSaved?.filter((saved) => saved.id !== itemId)
      );

      setNotification({
        message: `Removed from saved`,
        thumbnail: oldSaved?.find((saved) => saved.id == itemId)?.thumbnails[0]
          .url,
      });

      return { oldSaved };
    },
    onError: (_err, _mutationFnParameters, context) => {
      if (context?.oldSaved) {
        queryClient.setQueryData(["saved"], context.oldSaved);
      }
    },
    mutationFn: (itemId) => unsaveItem(itemId),
  });
};
