import {
  AccessControlList,
  Palette,
  PartialBy,
  Thumbnail,
  Track,
} from "@/types";

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
    id: string | null;
  };
  year: string;
  trackCount: number;
  duration: string;
  thumbnails: Thumbnail[];
  tracks: Track[];
  compressed?: boolean;
  permissions: AccessControlList<PlaylistAccessOptions>;
};

export type ResponsePlaylist = PartialBy<Playlist, "permissions"> & {
  userAccess: PlaylistAccessOptions[];
};
