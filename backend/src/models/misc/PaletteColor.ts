import { Model, Schema } from "mongoose";
import { reqNum, reqString } from "../utils";

import { PaletteColor } from "@/types";

export type PaletteColorSchema = PaletteColor;

type PaletteColorModel = Model<PaletteColorSchema>;

export const paletteColorSchema = new Schema<
  PaletteColorSchema,
  PaletteColorModel
>(
  {
    hex: reqString,
    rgb: new Schema<PaletteColor["rgb"]>(
      {
        r: reqNum,
        g: reqNum,
        b: reqNum,
      },
      { _id: false }
    ),
    area: reqNum,
    hue: reqNum,
    saturation: reqNum,
    lightness: reqNum,
    intensity: reqNum,
  },
  { _id: false }
);
