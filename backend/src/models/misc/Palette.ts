import { Model, Schema } from "mongoose";

import { Palette } from "@/types";
import { paletteColorSchema } from "./PaletteColor";

export type PaletteSchema = Palette;

type PaletteModel = Model<PaletteSchema>;

export const paletteSchema = new Schema<PaletteSchema, PaletteModel>(
  [{ type: paletteColorSchema }],
  { _id: false }
);
