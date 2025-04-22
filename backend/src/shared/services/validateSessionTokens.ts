import { ErrorDetail, UnauthorizedError } from "@/types";

import { JoiCookiesTokens } from "@/schemas";

export const validateSessionTokens = (cookies: any) => {
  const { error } = JoiCookiesTokens.validate(cookies, { abortEarly: false });

  if (error) {
    throw new UnauthorizedError(
      "Invalid session tokens",
      [new ErrorDetail("BadContent", error.message)],
      [error]
    );
  }
};
