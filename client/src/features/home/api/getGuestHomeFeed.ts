import { axios } from "@/libs/";
import { useQuery } from "@tanstack/react-query";

type getGuestHomeFeedOptions = {
  enabled?: boolean;
};

export const getGuestHomeFeed = (): Promise<any> =>
  axios.get(`/feeds/guestHome`).then((res) => res.data.data.feed);

export const useGuestHomeFeed = ({ enabled }: getGuestHomeFeedOptions = {}) => {
  return useQuery({
    enabled,
    queryKey: ["guestHome"],
    queryFn: async () => {
      return getGuestHomeFeed();
    },
  });
};
