import {
  AlbumCard,
  GenericCard,
  PlaylistCard,
  Thumbnail,
  Track,
} from "@/types";

import { Types } from "mongoose";

export type User = {
  _id: Types.ObjectId;
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
