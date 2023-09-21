import { AppError } from "@/types";
import { newInternalError } from "@/utils";
import { query } from "express";
import { ytMusic } from "@/loaders";

export const fetchSuggestions = async (process: string, query) => {
  try {
    process += ".FetchSuggestions";

    const suggestions = await ytMusic.getSearchSuggested(query);

    return suggestions;
  } catch (err) {
    if (err instanceof AppError) throw err;
    else throw newInternalError(process, err);
  }
};
