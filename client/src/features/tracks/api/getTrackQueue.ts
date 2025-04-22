import { QueueSource } from "@/features/player";
import { Track } from "..";
import { axios } from "@/libs/";
import { useQuery } from "@tanstack/react-query";

type getTrackQueueOptions = {
  enabled?: boolean;
  type?: QueueSource["type"];
  onSuccess?: (queue: Track[]) => any;
};

export const getTrackQueue = (
  id: string,
  type: QueueSource["type"]
): Promise<Track[]> =>
  axios
    .get(`/${!type ? "tracks" : type + "s"}/${id}/queue`)
    .then((res) => res.data.data.queue);

export const useTrackQueue = (
  id: string,
  { enabled, type, onSuccess }: getTrackQueueOptions = {}
) => {
  return useQuery({
    enabled,
    queryKey: ["queue", id],
    queryFn: async () => {
      return getTrackQueue(id, type);
    },
    onSuccess,
    refetchOnWindowFocus: false,
  });
};
