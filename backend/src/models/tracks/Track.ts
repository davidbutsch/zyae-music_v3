import { Model, Schema, model } from "mongoose";
import { paletteColorSchema, thumbnailSchema } from "../misc";

import { Track } from "@/types";
import { reqString } from "../utils";

export type TrackSchema = Track;

type TrackModel = Model<TrackSchema>;

export const trackSchema = new Schema<TrackSchema, TrackModel>(
  {
    id: reqString,
    title: reqString,
    thumbnails: [thumbnailSchema],
    duration: String,
    artists: {
      type: [
        new Schema<TrackSchema["artists"][0]>(
          {
            id: String,
            name: reqString,
          },
          { _id: false }
        ),
      ],
      required: true,
    },
    album: new Schema<TrackSchema["album"]>(
      {
        id: reqString,
        title: reqString,
      },
      { _id: false }
    ),
    palette: { type: [paletteColorSchema], required: false },
    isAvailable: Boolean,
    isExplicit: Boolean,
  },
  { _id: false }
);

export const TrackModel = model<TrackSchema, TrackModel>("Track", trackSchema);
