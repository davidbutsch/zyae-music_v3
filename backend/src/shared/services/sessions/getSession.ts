import {
  AppError,
  DeepPartial,
  ErrorDetail,
  NotFoundError,
  Session,
  UnauthorizedError,
} from "@/types";

import { matchRedisKeys } from "../matchRedisKeys";
import { newInternalError } from "@/utils";

type SessionDoc<CheckExists extends boolean> = CheckExists extends true
  ? Session
  : void | Session;

export const getSession = async <T extends boolean>(
  filter: DeepPartial<Session>,
  flags: {
    checkExists: T;
    checkExpired: boolean;
  }
): Promise<SessionDoc<T>> => {
  try {
    const session = (await matchRedisKeys("session", filter))[0];

    if (flags.checkExists && !session)
      throw new (flags.checkExpired ? UnauthorizedError : NotFoundError)(
        "Session not found",
        [
          new ErrorDetail(
            flags.checkExpired ? "Unauthorized" : "NotFound",
            "Session not found"
          ),
        ]
      );

    if (
      session &&
      flags.checkExpired &&
      new Date() > new Date(session.expiresAt)
    )
      throw new UnauthorizedError("Session access expired", [
        new ErrorDetail("Unauthorized", "Session access expired"),
      ]);

    return session as any;
  } catch (err) {
    if (err instanceof AppError) throw err;
    else throw newInternalError(err);
  }
};
