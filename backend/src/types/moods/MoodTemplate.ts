export type MoodTemplate = {
  title: string;
  genre: string;
  rows: {
    variant: "tracks" | "playlists" | "albums";
    playlistId?: string;
    cardIds: string[];
  }[];
};
