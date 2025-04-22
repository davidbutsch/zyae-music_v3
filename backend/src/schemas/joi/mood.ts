import Joi from "joi";
import { JoiReqString } from "./required";
import { Mood } from "@/types";

export const JoiMood = Joi.object<Mood>({
  title: JoiReqString,
  genre: Joi.object({
    title: JoiReqString,
    params: JoiReqString,
  }),
  rows: Joi.array()
    .items(
      Joi.object({
        variant: JoiReqString.valid("tracks", "playlists", "albums"),
        playlistId: Joi.string(),
        // TODO finish schema
      })
    )
    .required(),
});
