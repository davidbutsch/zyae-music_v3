export type Track = {
  id: string;
  title: string;
  thumbnail: { small: string | null; large: string | null };
  duration: string;
  artists: {
    name: string;
    id: string;
  }[];
  album: {
    title: string;
    id: string;
  };
  saved: boolean;
  isAvailable: boolean;
  isExplicit: boolean;
};
