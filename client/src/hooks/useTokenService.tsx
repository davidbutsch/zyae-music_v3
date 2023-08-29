import { clearUser, setUser } from "@/stores";
import { useEffect, useState } from "react";

import { AUTH_API_URL } from "@/config";
import { User } from "@/types";
import { axios } from "@/libs";
import { useAppDispatch } from ".";

const getMe = async () => {
  await getNewTokens();
  const user = (
    await axios.get<{ data: { user: User } }>(`${AUTH_API_URL}/db/users/me`)
  ).data.data.user;
  return user;
};

const getNewTokens = async () => {
  await axios.get(`${AUTH_API_URL}/auth/sessions/tokens`);
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

  useEffect(() => {
    (async () => {
      try {
        const user = await getMe();
        dispatch(setUser(user)), setStatus("auth");
      } catch (err) {
        dispatch(clearUser()), setStatus("noauth");
      }

      registerClient();
    })();

    const refreshInterval = setInterval(
      async () => await getNewTokens(),
      1000 * 60 * 5
    );

    return () => clearInterval(refreshInterval);
  }, []);

  return { status };
};
