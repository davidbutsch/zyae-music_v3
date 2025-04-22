import Joi from "joi";

export const JoiArtistId = Joi.string().required().length(24);
