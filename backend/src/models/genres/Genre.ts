import { Model, Schema, Types, model } from "mongoose";
import { albumCardSchema, thumbnailSchema, trackSchema } from "@/models";

import { Genre } from "@/types";
import { playlistCardSchema } from "../playlists";
import { reqString } from "../utils";

export interface GenreSchema extends Genre {
  _id: Types.ObjectId;
}

type GenreModel = Model<GenreSchema>;

export const genreSchema = new Schema<GenreSchema, GenreModel>({
  params: reqString,
  title: reqString,
  thumbnails: [thumbnailSchema],
  tracks: {
    id: reqString,
    results: [trackSchema],
  },
  albums: [albumCardSchema],
  playlists: [playlistCardSchema],
  moods: [{ type: Types.ObjectId, ref: "Mood" }],
});

export const GenreModel = model<GenreSchema, GenreModel>("Genre", genreSchema);
