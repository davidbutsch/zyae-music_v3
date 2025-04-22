import { Model, Schema, Types, model } from "mongoose";
import {
  accessControlListSchema,
  paletteColorSchema,
  thumbnailSchema,
} from "../misc";
import { reqNum, reqString } from "../utils";

import { Playlist } from "@/types";
import { trackSchema } from "../tracks";

export interface PlaylistSchema extends Playlist {
  _id?: Types.ObjectId;
}

type PlaylistModel = Model<PlaylistSchema>;

export const playlistSchema = new Schema<PlaylistSchema, PlaylistModel>({
  _id: Schema.Types.ObjectId,
  id: reqString,
  description: String,
  title: reqString,
  palette: [paletteColorSchema],
  author: new Schema<PlaylistSchema["author"]>(
    {
      id: String,
      name: reqString,
    },
    { _id: false }
  ),
  year: reqString,
  trackCount: reqNum,
  duration: reqString,
  thumbnails: [thumbnailSchema],
  tracks: [trackSchema],
  compressed: Boolean,
  permissions: accessControlListSchema,
});

export const PlaylistModel = model<PlaylistSchema, PlaylistModel>(
  "Playlist",
  playlistSchema
);
