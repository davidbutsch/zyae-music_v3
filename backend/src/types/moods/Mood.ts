import { AlbumCard } from "../albums";
import { Palette } from "../misc";
import { PlaylistCard } from "../playlists";
import { Track } from "../tracks";

export type MoodRow = {
  variant: "tracks" | "playlists" | "albums";
  playlistId?: string;
  results: Track[] | PlaylistCard[] | AlbumCard[];
};

export type Mood = {
  title: string;
  palette: Palette;
  genre?: { params: string; title: string };
  rows: MoodRow[];
};
