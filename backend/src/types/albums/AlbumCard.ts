export type AlbumCard = {
  id: string;
  title: string;
  thumbnail: string;
  year: string;
  type?: "Album" | "Single";
  isExplicit?: boolean;
};
