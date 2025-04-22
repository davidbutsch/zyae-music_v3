import Joi from "joi";

export const JoiGenreId = Joi.string().required().length(24);
