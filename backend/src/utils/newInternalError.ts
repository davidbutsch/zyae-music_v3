import { ErrorDetail, InternalServerError } from "@/types";

export const newInternalError = (err: any) =>
  new InternalServerError(
    err.message,
    [new ErrorDetail(err.name || "InternalError", err.message)],
    [err]
  );
