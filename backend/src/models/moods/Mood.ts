import { Model, Schema, Types, model } from "mongoose";

import { Mood } from "@/types";
import { paletteColorSchema } from "../misc";
import { reqString } from "../utils";

export interface MoodSchema extends Mood {
  _id: Types.ObjectId;
}

type MoodModel = Model<MoodSchema>;

export const moodSchema = new Schema<MoodSchema, MoodModel>({
  title: reqString,
  palette: [paletteColorSchema],
  genre: new Schema(
    {
      title: reqString,
      params: reqString,
    },
    { _id: false }
  ),

  rows: [
    new Schema(
      {
        variant: {
          type: String,
          enum: ["tracks", "playlists", "albums"],
          required: true,
        },
        playlistId: String,
        results: [Schema.Types.Mixed],
      },
      { _id: false }
    ),
  ],
});

export const MoodModel = model<MoodSchema, MoodModel>("Mood", moodSchema);
