import {
  AppError,
  ErrorDetail,
  LeanedUserDoc,
  NotFoundError,
  User,
} from "@/types";

import { Document } from "mongoose";
import { UserModel } from "@/models";
import { newInternalError } from "@/utils";

type UserDoc<Leaned> = Leaned extends true ? LeanedUserDoc : User & Document;

export const getUserById = async <T extends boolean>(
  userId: string,
  flags: { lean?: T; throwNotFound?: boolean } = {
    lean: false as T,
    throwNotFound: true,
  }
): Promise<UserDoc<T>> => {
  try {
    const user = await UserModel.findById(userId).lean(flags.lean);

    if (flags.throwNotFound && !user)
      throw new NotFoundError("User not found", [
        new ErrorDetail("NotFound", "User not found"),
      ]);

    return user as UserDoc<T>;
  } catch (err) {
    if (err instanceof AppError) throw err;
    else throw newInternalError(err);
  }
};
