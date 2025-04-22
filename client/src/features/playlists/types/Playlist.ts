import { AccessControlList, Palette, PartialBy, Thumbnail } from "@/types";

import { Track } from "@/features/tracks";

export type PlaylistAccessOptions =
  | "view"
  | "edit:metadata"
  | "edit:tracks"
  | "delete";

export type Playlist = {
  id: string;
  title: string;
  description?: string;
  palette: Palette;
  author: {
    name: string;
    id: string;
  };
  year: string;
  trackCount: number;
  duration: string;
  thumbnails: Thumbnail[];
  tracks: Track[];
  compressed?: boolean;
  permissions?: AccessControlList<PlaylistAccessOptions>;
  userAccess: PlaylistAccessOptions[];
};

export type ResponsePlaylist = PartialBy<Playlist, "permissions"> & {
  userAccess: PlaylistAccessOptions[];
};
