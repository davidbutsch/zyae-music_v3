import { AppError, AppResponse, NotFoundError } from "@/types";
import { NextFunction, Request, Response } from "express";

import Joi from "joi";
import { UserModel } from "@/models";
import { newInternalError } from "@/utils";
import { validate } from "@/shared";

export const deletePlaylist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validate(
      req.body,
      "body",
      Joi.object({ playlistId: Joi.string() }).required()
    );

    const playlistId: string = req.body.playlistId;

    const zyaeUser = res.locals.user;

    if (!zyaeUser) throw new NotFoundError("zyae User not found");

    const user = await UserModel.findById(zyaeUser._id);

    if (!user) throw new NotFoundError("User not found");

    const filtered = user.saved.filter((entry) => entry.id !== playlistId);
    user.saved = filtered;
    await user.save();

    const response: AppResponse<any> = {
      data: { message: "Success" },
    };

    res.json(response);
  } catch (err) {
    if (err instanceof AppError) return next(err);
    else return next(newInternalError(err));
  }
};
