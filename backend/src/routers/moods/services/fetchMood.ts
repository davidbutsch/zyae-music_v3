import { AppError } from "@/types";
import { newInternalError } from "@/utils";

export const fetchMood = async () => {
  try {
    const data = {};

    return data;
  } catch (err) {
    if (err instanceof AppError) throw err;
    else throw newInternalError(err);
  }
};
