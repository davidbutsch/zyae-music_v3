import Joi from "joi";
import { JoiReqString } from "./required";

export const JoiCookiesTokens = Joi.object({
  at: JoiReqString,
  rt: JoiReqString,
});
