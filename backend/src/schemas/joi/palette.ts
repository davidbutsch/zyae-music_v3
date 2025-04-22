import { JoiReqNum, JoiReqString } from "./required";

import Joi from "joi";

const JoiPaletteColor = Joi.object({
  hex: JoiReqString,
  rgb: Joi.object({
    r: JoiReqNum,
    g: JoiReqNum,
    b: JoiReqNum,
  }),
  area: JoiReqNum,
  hue: JoiReqNum,
  saturation: JoiReqNum,
  lightness: JoiReqNum,
  intensity: JoiReqNum,
});

export const JoiPalette = Joi.array().items(JoiPaletteColor);
