import { useEffect, useState } from "react";

import { Playlist } from "@/features/playlists";
import { useAppSelector } from "@/hooks";
import { useQuery } from "@tanstack/react-query";

export const useTrackSavedStatus = (trackId?: string) => {
  const [saved, setSaved] = useState(false);

  const user = useAppSelector((state) => state.user);
  const { data: savedTracks } = useQuery<Playlist>(
    ["playlist", user?.tracksId],
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (savedTracks) {
      const saved = savedTracks.tracks.find((track) => track.id == trackId);
      setSaved(Boolean(saved));
    }
  }, [savedTracks, trackId]);

  return saved;
};
