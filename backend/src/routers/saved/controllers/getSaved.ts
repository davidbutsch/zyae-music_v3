import { AppError, AppResponse, GenericCard, NotFoundError } from "@/types";
import { NextFunction, Request, Response } from "express";

import { UserModel } from "@/models";
import { newInternalError } from "@/utils";

export const getSaved = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserModel.findById(res.locals.session?.userId).lean();

    if (!user) throw new NotFoundError("User not found");

    const response: AppResponse<GenericCard[]> = {
      data: { saved: user.saved },
    };

    res.json(response);
  } catch (err) {
    if (err instanceof AppError) return next(err);
    else return next(newInternalError(err));
  }
};
