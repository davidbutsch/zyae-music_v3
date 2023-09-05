import { AppError } from "@/types";
import { newInternalError } from "@/utils";
import { ytMusic } from "@/loaders";

export const fetchArtist = async (process: string, artistId: string) => {
  try {
    process += ".FetchArtist";

    const ytArtist = await ytMusic.getArtist(artistId);

    return ytArtist;
  } catch (err) {
    if (err instanceof AppError) throw err;
    else throw newInternalError(process, err);
  }
};
