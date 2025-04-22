import { JoiReqBool, JoiReqString } from "../required";

import Joi from "joi";

export const JoiNewPlaylist = Joi.object({
  title: JoiReqString,
  description: Joi.string(),
  public: JoiReqBool,
});
