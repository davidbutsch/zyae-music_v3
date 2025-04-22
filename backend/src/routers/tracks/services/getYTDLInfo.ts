import { AppError } from "@/types";
import { newInternalError } from "@/utils";
import ytdl from "ytdl-core";

export const getYTDLInfo = async (trackId: string) => {
  try {
    const info = await ytdl.getInfo(
      `https://www.youtube.com/watch?v=${trackId}`
    );

    return info;
  } catch (err) {
    if (err instanceof AppError) throw err;
    else throw newInternalError(err);
  }
};
