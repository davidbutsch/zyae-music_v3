import { Model, Schema, model } from "mongoose";

import { User } from "@/types";
import { albumCardSchema } from "../albums";
import { genericCardSchema } from "../misc/GenericCardSchema";
import { playlistCardSchema } from "../playlists";
import { reqString } from "../utils";
import { thumbnailSchema } from "../misc";
import { trackSchema } from "../tracks";

export type UserSchema = User;

type UserModel = Model<User>;

export const userSchema = new Schema<UserSchema, UserModel>({
  _id: Schema.Types.ObjectId,
  profile: new Schema<UserSchema["profile"]>(
    {
      displayName: reqString,
      thumbnails: [thumbnailSchema],
    },
    { _id: false }
  ),
  saved: [genericCardSchema],
  tracksId: reqString,
  recentlyPlayed: new Schema<User["recentlyPlayed"]>(
    {
      tracks: [trackSchema],
      playlists: [playlistCardSchema],
      albums: [albumCardSchema],
    },
    { _id: false }
  ),
});

export const UserModel = model<UserSchema, UserModel>("User", userSchema);
