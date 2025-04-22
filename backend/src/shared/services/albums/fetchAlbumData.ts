import { AppError } from "@/types";
import { newInternalError } from "@/utils";
import { parseAlbum } from "@/shared";
import { ytMusic } from "@/loaders";

export const fetchAlbumData = async (albumId: string) => {
  try {
    const ytAlbum = await ytMusic.getAlbum(albumId);
    const album = await parseAlbum(albumId, ytAlbum);

    return album;
  } catch (err) {
    if (err instanceof AppError) throw err;
    else throw newInternalError(err);
  }
};
