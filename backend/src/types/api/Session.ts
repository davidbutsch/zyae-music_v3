import { Thumbnail } from "@/types";
import { Types } from "mongoose";

export type DeviceInfo = {
  os: string;
  browser: string;
};

export type GeoLocation = {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
};

export type Client = {
  app: "idle" | "bytes" | "music";
  socketId: string;
  ipAddress: string;
  userAgent: string;
  deviceInfo: DeviceInfo;
  geoLocation: GeoLocation | null;
};

export interface ZyaeUser {
  _id: Types.ObjectId;
  auth: {
    provider: "local" | "google";
    googleId: string | null;
    password: string | null;
    email: string;
  };
  profile: {
    displayName: string;
    thumbnail: Thumbnail[];
    bio?: string;
  };
  metadata: {
    createdAt: Date;
  };
}

export type Session = {
  id: string;
  userId: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  updatedAt: Date;
};
