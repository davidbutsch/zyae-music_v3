import { GenericCard, Thumbnail } from "@/types";

import { AlbumCard } from "@/features/albums";
import { PlaylistCard } from "@/features/playlists";
import { Track } from "@/features/tracks";

export type User = {
  _id: string;
  profile: {
    displayName: string;
    thumbnails: Thumbnail[];
  };
  saved: GenericCard[];
  tracksId: string;
  recentlyPlayed: {
    tracks: Track[];
    playlists: PlaylistCard[];
    albums: AlbumCard[];
  };
};
