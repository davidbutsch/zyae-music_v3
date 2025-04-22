import { axios, queryClient } from "@/libs/";

import { AxiosError } from "axios";
import { Playlist } from "@/features/playlists";
import { useAppNavigate } from "@/hooks";
import { useMutation } from "@tanstack/react-query";
import { useNotification } from "@/providers";

type newPlaylist = {
  title: string;
  description?: string;
  public: boolean;
};

export const createPlaylist = (playlist: newPlaylist): Promise<Playlist> =>
  axios.post(`/playlists/`, { playlist }).then((res) => res.data.data.playlist);

export const useCreatePlaylist = () => {
  const navigate = useAppNavigate();
  const { setNotification } = useNotification();

  return useMutation({
    onError: (_err: AxiosError, _mutationFnParameters) => {
      setNotification({
        message: `Unable to create playlist: ${_err.message}`,
        icon: "fi-rr-exclamation",
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["saved"]);
      navigate(`../../playlist/${data.id}`);
    },
    mutationFn: (playlist: newPlaylist) => createPlaylist(playlist),
  });
};
