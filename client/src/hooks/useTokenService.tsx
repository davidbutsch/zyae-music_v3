import { API_URL, AUTH_API_URL } from "@/config";
import { axios, queryClient } from "@/libs";
import { clearUser, setUser } from "@/stores";
import { useAppDispatch, useAppSelector } from ".";
import { useEffect, useState } from "react";

import { User } from "@/features/auth";
import { usePlaylist } from "@/features/playlists";

const getMe = async () => {
  await getNewTokens();
  const user = (
    await axios.get<{ data: { user: User } }>(
      `${API_URL}/users/me/?insert=true`
    )
  ).data.data.user;

  return user;
};

const getNewTokens = async () => {
  await axios.post(`${AUTH_API_URL}sessions/tokens`);
};

const registerClient = async () => {
  try {
    const body = {
      client: {
        app: "music",
        socketId: "not_implemented",
        userAgent: window.navigator.userAgent,
      },
    };

    axios.post(`${AUTH_API_URL}/auth/sessions/clients`, body);
  } catch (err) {}
};

export const useTokenService = () => {
  const dispatch = useAppDispatch();

  const [status, setStatus] = useState<"loading" | "auth" | "noauth">(
    "loading"
  );

  const user = useAppSelector((state) => state.user);
  usePlaylist(user?.tracksId!, {
    enabled: Boolean(user),
  });

  useEffect(() => {
    (async () => {
      try {
        const user = await getMe();
        dispatch(setUser(user)), setStatus("auth");

        queryClient.prefetchQuery({
          queryKey: ["saved"],
          queryFn: () => user.saved,
        });
        // queryClient.setQueriesData(["saved", "albums"], user.saved.albums);
        // queryClient.setQueriesData(["saved", "artists"], user.saved.artists);

        // const savedTracks = await getPlaylist(user.tracksId);
        // console.log(savedTracks);

        // useQuery({
        //   queryKey: ["playlist", savedTracks.id],
        //   queryFn: async () => await getPlaylist(user.tracksId),
        // });

        registerClient();
      } catch (err) {
        dispatch(clearUser()), setStatus("noauth");
      }
    })();
  }, []);

  useEffect(() => {
    console.log(status);
    if (status == "auth") {
      const refreshInterval = setInterval(
        async () => await getNewTokens(),
        1000 * 60 * 5
      );

      return () => clearInterval(refreshInterval);
    }
  }, [status]);

  return { status };
};
