import { AlbumCard } from "@/features/albums";
import { Palette } from "@/types";
import { PlaylistCard } from "@/features/playlists";
import { Track } from "@/features/tracks";

type TracksRow = {
  variant: "tracks";
  playlistId?: string;
  results: Track[];
};

type PlaylistRow = {
  variant: "playlists";
  playlistId?: string;
  results: PlaylistCard[];
};

type AlbumRow = {
  variant: "albums";
  playlistId?: string;
  results: AlbumCard[];
};

export type MoodRow = TracksRow | PlaylistRow | AlbumRow;

export type Mood = {
  title: string;
  palette: Palette;
  genre?: { params: string; title: string };
  rows: MoodRow[];
};
