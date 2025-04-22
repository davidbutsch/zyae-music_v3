import { AppError } from "@/types";
import { GenreModel } from "@/models";
import { newInternalError } from "@/utils";

export const fetchGenres = async () => {
  try {
    const genres = await GenreModel.find().lean();

    const cards = genres.map((genre) => ({
      params: genre.params,
      title: genre.title,
      thumbnails: genre.thumbnails,
    }));

    return cards;
  } catch (err) {
    if (err instanceof AppError) throw err;
    else throw newInternalError(err);
  }
};
