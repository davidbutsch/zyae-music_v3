import { info } from "winston";
import { newInternalError } from "@/utils";
import ytdl from "ytdl-core";

export const getAudioStream = async (process: string, trackId: string) => {
  try {
    process += ".GetAudioStream";

    const stream = ytdl(`https://www.youtube.com/watch?v=${trackId}`, {
      filter: "audioonly",
    });
    const info = ytdl.getInfo(`https://www.youtube.com/watch?v=${trackId}`);

    // return info;
    // console.log(await info);
    return stream;
  } catch (err) {
    throw newInternalError(process, err);
  }
};
