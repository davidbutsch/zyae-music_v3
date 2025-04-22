import { Model, Schema } from "mongoose";

import { GenericCard } from "@/types";
import { reqString } from "../utils";
import { thumbnailSchema } from "../misc";

export type GenericCardSchema = GenericCard;

type GenericCardModel = Model<GenericCardSchema>;

export const genericCardSchema = new Schema<
  GenericCardSchema,
  GenericCardModel
>(
  {
    id: reqString,
    thumbnails: [thumbnailSchema],
    type: {
      type: String,
      enum: ["playlist", "artist", "album"],
      required: true,
    },
    title: reqString,
    sub: reqString,
  },
  { _id: false }
);
