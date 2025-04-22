import { AppError } from "@/types";
import { GenreModel } from "@/models";
import { newInternalError } from "@/utils";

export const fetchGenre = async (params: string) => {
  try {
    const genre = GenreModel.findOne({ params }).populate("moods");

    return genre;
  } catch (err) {
    console.log(err);
    if (err instanceof AppError) throw err;
    else throw newInternalError(err);
  }
};
