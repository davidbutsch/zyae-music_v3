import { BadRequestError, ErrorDetail, ErrorReason } from "@/types";

import { AnySchema } from "joi";

const getErrorMetaData = (
  type: string
): { reason: ErrorReason; message: string } => {
  switch (type) {
    case "body":
      return {
        reason: "BadContent",
        message: "Bad request body",
      };
    case "params":
      return {
        reason: "InvalidParameter",
        message: "Bad request parameters",
      };
    case "query":
      return {
        reason: "InvalidQuery",
        message: "Bad request query",
      };
    case "cookies":
      return {
        reason: "BadContent",
        message: "Bad request cookies",
      };
    case "data":
      return {
        reason: "BadContent",
        message: "Bad request data",
      };
    default:
      return {
        reason: "BadRequest",
        message: "Bad request",
      };
  }
};

export const validate = (
  value: any,
  valueType: "body" | "params" | "query" | "cookies" | "data" = "data",
  validator: AnySchema
) => {
  const errorMetaData = getErrorMetaData(valueType);

  const { error } = validator.validate(value, { abortEarly: false });

  if (error) {
    throw new BadRequestError(
      errorMetaData.message,
      // details,
      [new ErrorDetail(errorMetaData.reason, error.message)],
      [error]
    );
  }
};
