import { AppError, AppResponse, User } from "@/types";
import { NextFunction, Request, Response } from "express";

import { UserModel } from "@/models";
import { newInternalError } from "@/utils";
import { createUser } from "../services";

export const getMe = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.session?.userId;
    const zyaeUser = res.locals.user;

    const localUser = await UserModel.findById(userId);

    if (localUser) {
      const response: AppResponse<User> = { data: { user: localUser } };
      res.json(response);
    } else {
      if (!zyaeUser) return res.json("no szae user");
      createUser(
        zyaeUser._id,
        zyaeUser.profile.firstName,
        zyaeUser.profile.thumbnail
      );
    }
    // throw new NotFoundError("User not found", [
    //   new ErrorDetail("NotFound", "User not found"),
    // ]);
  } catch (err) {
    if (err instanceof AppError) return next(err);
    else return next(newInternalError(err));
  }
};
