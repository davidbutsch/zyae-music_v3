import { useEffect, useState } from "react";

import { PlaylistCard } from "@/features/playlists";
import { useQuery } from "@tanstack/react-query";

export const useSavedStatus = (itemId?: string) => {
  const [isSaved, setIsSaved] = useState(false);

  const { data: savedItems } = useQuery<PlaylistCard[]>(["saved"], {
    enabled: false,
  });

  useEffect(() => {
    if (savedItems) {
      const saved = savedItems.find((savedItem) => savedItem.id == itemId);
      setIsSaved(Boolean(saved));
    }
  }, [savedItems, itemId]);

  return isSaved;
};
