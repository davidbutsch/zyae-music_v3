import { Model, Schema } from "mongoose";

import { ArtistCard } from "@/types";
import { reqString } from "../utils";
import { thumbnailSchema } from "../misc";

export type ArtistCardSchema = ArtistCard;

type ArtistCardModel = Model<ArtistCardSchema>;

export const artistCardSchema = new Schema<ArtistCardSchema, ArtistCardModel>(
  {
    id: reqString,
    name: reqString,
    thumbnails: [thumbnailSchema],
  },
  { _id: false }
);
