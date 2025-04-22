import { AppError } from "@/types";
import axios from "axios";
import config from "@/config";
import { newInternalError } from "@/utils";

export const grabYoutubeVideoMixPlaylistItems = async (videoId: string) => {
  try {
    const mix = (
      await axios.get(
        `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails,snippet&playlistId=RD${videoId}&key=${config.googleApisKey}&maxResults=10`
      )
    ).data;

    // const items = await ytMusic.getWatchlist(`RD${videoId}`);

    // const items = mix.items.map((item) => {
    //   const thumbnails = item.snippet.thumbnails;
    //   return {
    //     trackId: item.contentDetails.videoId,
    //     title: item.snippet.title,
    //     thumbnail:
    //       thumbnails[
    //         Object.keys(thumbnails)[Object.keys(thumbnails).length - 1]
    //       ].url,
    //   };
    // });

    // const items = await Promise.all(
    //   [mix.items[2], mix.items[4]].map(async (item: any) => {
    //     const watchList = await ytMusic.getWatchlist(
    //       item.contentDetails.videoId
    //     );
    //     return watchList.tracks[0];
    //   })
    // );

    // const items = [];

    // for (const item of mix.items) {
    //   const watchList = await ytMusic.getWatchlist(item.contentDetails.videoId);
    //   items.push(watchList.tracks[0]);
    // }

    // const tracks: Track[] = items.map((track: any): Track => {
    //   return {
    //     id: track.videoId,
    //     title: track.title,
    //     thumbnail: {
    //       small: setGoogleContentSize(track.thumbnail[0].url, 256, 256),
    //       large: setGoogleContentSize(track.thumbnail[0].url, 512, 512),
    //     },
    //     duration: track.length,
    //     artists: track.artists,
    //     album: track.album
    //       ? {
    //           id: track.album.id,
    //           title: track.album.name,
    //         }
    //       : undefined,
    //     saved: false,
    //     isAvailable: true,
    //   };
    // });

    return mix;
  } catch (err) {
    if (err instanceof AppError) throw err;
    else throw newInternalError(err);
  }
};
