import Joi from "joi";

export const JoiYtPlaylist = Joi.alternatives(
  Joi.string().length(34),
  Joi.string().length(36),
  Joi.string().length(43),
  Joi.string().length(41)
);

export const JoiZyaePlaylist = Joi.string().length(24);
export const JoiPlaylistId = Joi.alternatives(JoiYtPlaylist, JoiZyaePlaylist);
