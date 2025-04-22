import { ExploreFeed } from "../types";
import { axios } from "@/libs/";
import { useQuery } from "@tanstack/react-query";

type getExploreFeedOptions = {
  enabled?: boolean;
};

export const getExploreFeed = (): Promise<ExploreFeed> =>
  axios.get(`/explore/feed/`).then((res) => res.data.data.feed);

export const useExploreFeed = ({ enabled }: getExploreFeedOptions = {}) => {
  return useQuery({
    enabled,
    queryKey: ["explore"],
    queryFn: async () => {
      return getExploreFeed();
    },
  });
};
