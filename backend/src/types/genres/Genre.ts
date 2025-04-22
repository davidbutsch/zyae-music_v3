import { AlbumCard } from "../albums";
import { PlaylistCard } from "../playlists";
import { Thumbnail } from "../misc";
import { Track } from "../tracks";

export type Genre = {
  params: string;
  title: string;
  thumbnails: Thumbnail[];
  tracks: { id: string; results: Track[] };
  albums: AlbumCard[];
  playlists: PlaylistCard[];
  moods?: string[];
};
