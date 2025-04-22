import config from "@/config";
import { newInternalError } from "@/utils";
import fs from "fs";
import YTDlpWrap from "yt-dlp-wrap";

const fileExists = async (path: string) => {
  try {
    return !!(await fs.promises.stat(path).catch(() => false));
  } catch (err) {
    throw newInternalError(err);
  }
};

export const getAudioFile = async (trackId: string) => {
  try {
    const path = `${config.mediaPath}/${trackId}.mp3`;

    if (await fileExists(path)) return path;

    const ytDlpWrap = new YTDlpWrap(config.ytDlpPath);

    await ytDlpWrap.execPromise([
      `https://www.youtube.com/watch?v=${trackId}`,
      "-f",
      "140",
      "-o",
      path,
      "-x",
      "--audio-format",
      "mp3",
      "--ffmpeg-location",
      config.ffmpegPath,
    ]);

    return path;
  } catch (err) {
    throw newInternalError(err);
  }
};
