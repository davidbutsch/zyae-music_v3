import { AlbumCard } from "@/features/albums";
import { Mood } from "@/features/moods";
import { PlaylistCard } from "@/features/playlists";
import { Thumbnail } from "@/types";
import { Track } from "@/features/tracks";

export type Genre = {
  params: string;
  title: string;
  thumbnails: Thumbnail[];
  tracks: { id: string; results: Track[] };
  albums: AlbumCard[];
  playlists: PlaylistCard[];
  moods: Mood[];
};
