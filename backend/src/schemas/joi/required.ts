import Joi from "joi";

export const JoiReqString = Joi.string().required();
export const JoiReqNum = Joi.number().required();
export const JoiReqBool = Joi.boolean().required();
