import {
  AppError,
  AppResponse,
  ErrorDetail,
  NotFoundError,
  User,
} from "@/types";
import { Model, Schema, model } from "mongoose";
import { NextFunction, Request, Response } from "express";

import { UserModel } from "@/models";
import { createUser } from "../services";
import mongoose from "mongoose";
import { newInternalError } from "@/utils";

export const getMe = async (
  req: Request,
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
