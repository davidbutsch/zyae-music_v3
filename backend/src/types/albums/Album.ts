export type Album = {
  id: string;
  title: string;
  thumbnail: { small: string; large: string };
  year: string;
  duration: string;
  artists: {
    name: string;
    id: string;
  }[];
  saved: boolean;
  isExplicit: boolean;
};
