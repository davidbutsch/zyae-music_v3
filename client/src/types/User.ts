// auth
export interface Auth {
  provider: "local" | "google";
  googleId: string | null;
  password: string | null;
  email: string;
}

// profile
export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}
export interface Profile {
  displayName: string;
  thumbnail: Thumbnail[];
  bio?: string;
}

// metadata
export interface Metadata {
  createdAt: Date;
}

export interface User {
  _id: string;
  auth: Auth;
  profile: Profile;
  metadata: Metadata;
}
