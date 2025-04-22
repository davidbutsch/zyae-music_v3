import { AlbumCard } from "@/features/albums";

export type ArtistDiscography = {
  artist: { id: string; name: string };
  items: AlbumCard[];
};
