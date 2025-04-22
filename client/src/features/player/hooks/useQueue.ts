import { Track, getTrackQueue } from "@/features/tracks";
import {
  setActiveQueueIndex,
  setQueue,
  setQueueSource,
  setShuffle,
} from "@/stores";
import { useCallback, useState } from "react";

import { QueueSource } from "..";
import { useAppDispatch } from "@/hooks";

// BUG different components (such as TracksList and ResultRow) which both call this hook create seperate hook instances.
// this means that playing a song in one component and then switching to a previously played song in another component
// will not actually switch the songs playing (because that component is not aware that other songs have been played
// (it only has access to its own state(because its a seperate instance)))

type useQueueProps = {
  queueSource?: QueueSource;
  options?: { shuffle?: Boolean; fixedIndex?: boolean };
};

export const useQueue = ({ queueSource, options }: useQueueProps = {}) => {
  if (!options) {
    options = {
      shuffle: false,
      fixedIndex: true,
    };
  }

  const dispatch = useAppDispatch();

  // all this is a temporary solution (force state update)
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({} as any), []);

  const [status, setStatus] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");

  const playQueue = async (track?: Track) => {
    setStatus("loading");
    if (track) {
      dispatch(setQueue([track]));
      dispatch(setActiveQueueIndex(0));
    }
    dispatch(setQueueSource(queueSource || { title: "Suggested tracks" }));
    const queue = await getTrackQueue(
      queueSource?.id || track?.id!,
      queueSource?.type
    );
    if (!queueSource?.type || options?.shuffle) dispatch(setShuffle(true));
    else dispatch(setShuffle(false));

    const index = queue.findIndex((queueTrack) => queueTrack.id == track?.id);
    dispatch(
      setQueue({
        tracks: queue,
        fixedIndex: options?.fixedIndex ? (index >= 0 ? index : 0) : undefined,
      })
    );
    dispatch(setQueueSource(queueSource || { title: "Suggested tracks" }));
    setStatus("success");

    forceUpdate();
  };

  return { playQueue, status };
};
