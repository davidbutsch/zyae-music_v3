import { Model, Schema } from "mongoose";

import { PlaylistCard } from "@/types";
import { reqString } from "../utils";
import { thumbnailSchema } from "../misc";

export type PlaylistCardSchema = PlaylistCard;

type PlaylistCardModel = Model<PlaylistCardSchema>;

export const playlistCardSchema = new Schema<
  PlaylistCardSchema,
  PlaylistCardModel
>(
  {
    id: reqString,
    title: reqString,
    thumbnails: [thumbnailSchema],
    sub: reqString,
    author: String,
  },
  { _id: false }
);
