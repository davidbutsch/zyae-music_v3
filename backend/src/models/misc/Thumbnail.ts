import { Model, Schema } from "mongoose";
import { reqNum, reqString } from "../utils";

import { Thumbnail } from "@/types";

export type ThumbnailSchema = Thumbnail;

type ThumbnailModel = Model<ThumbnailSchema>;

export const thumbnailSchema = new Schema<ThumbnailSchema, ThumbnailModel>(
  {
    url: reqString,
    width: reqNum,
    height: reqNum,
  },
  { _id: false }
);
