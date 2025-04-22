import { Model, Schema } from "mongoose";

import { AlbumCard } from "@/types";
import { reqString } from "../utils";
import { thumbnailSchema } from "../misc";

export type AlbumCardSchema = AlbumCard;

type AlbumCardModel = Model<AlbumCardSchema>;

export const albumCardSchema = new Schema<AlbumCardSchema, AlbumCardModel>(
  {
    id: reqString,
    title: reqString,
    thumbnails: [thumbnailSchema],
    sub: reqString,
    year: String,
    type: {
      type: String,
      enum: ["Album", "Single"],
    },
    isExplicit: Boolean,
  },
  { _id: false }
);
