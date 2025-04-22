import YTDlpWrap from "yt-dlp-wrap";
import fs from "fs";
import { newInternalError } from "@/utils";

const fileExists = async (path: string) => {
  try {
    return !!(await fs.promises.stat(path).catch(() => false));
  } catch (err) {
    throw newInternalError(err);
  }
};

export const getVideoFile = async (trackId: string) => {
  try {
    const path = `D:/zm_tracks/videos/${trackId}.mp4`;

    if (await fileExists(path)) return path;

    const ytDlpWrap = new YTDlpWrap("C:/yt-dlp/src/yt-dlp.exe");

    await ytDlpWrap.execPromise([
      `https://www.youtube.com/watch?v=${trackId}`,
      "-f bestvideo[height<=720][ext=mp4][vcodec^=avc]",
      "-o",
      path,
    ]);

    return path;
  } catch (err) {
    throw newInternalError(err);
  }
};
