export interface Track {
  id: string;
  title: string;
  thumbnail: { small: string; large: string };
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
}
