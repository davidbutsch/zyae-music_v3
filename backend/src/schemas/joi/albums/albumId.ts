import Joi from "joi";

export const JoiAlbumId = Joi.string().required().length(17);
