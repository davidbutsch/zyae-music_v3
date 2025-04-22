import { AppError, AppResponse, GenericCard, NotFoundError } from "@/types";
import { NextFunction, Request, Response } from "express";

import Joi from "joi";
import { JoiReqString } from "@/schemas";
import { UserModel } from "@/models";
import { newInternalError } from "@/utils";
import { validate } from "@/shared";

export const unsaveItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validate(
      req.params,
      "params",
      Joi.object({
        itemId: JoiReqString,
      }).required()
    );

    const itemId = req.params.itemId;
    const user = await UserModel.findById(res.locals.session?.userId);

    if (!user) throw new NotFoundError("User not found");

    user.saved = user.saved.filter((savedItem) => savedItem.id !== itemId);
    user.save();

    const response: AppResponse<GenericCard[]> = {
      data: { saved: user.saved },
    };

    res.json(response);
  } catch (err) {
    if (err instanceof AppError) return next(err);
    else return next(newInternalError(err));
  }
};
