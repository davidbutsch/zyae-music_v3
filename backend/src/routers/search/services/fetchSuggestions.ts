import { AppError } from "@/types";
import axios from "axios";
import { newInternalError } from "@/utils";

export const fetchSuggestions = async (query: string) => {
  try {
    // DO NOT COMMIT THIS
    const url = `https://api-v2.soundcloud.com/search/queries?q=${query}&client_id=EJWQJ2YlSZR6iQv1JedV49meW48sh4A0`;

    const suggestions = (await axios.get(url)).data.collection.map(
      (suggestion: any) => suggestion.output
    );

    return suggestions;
  } catch (err) {
    if (err instanceof AppError) throw err;
    else throw newInternalError(err);
  }
};
