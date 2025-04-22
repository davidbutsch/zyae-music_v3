import {
  AccessControlList,
  AppError,
  Playlist,
  PlaylistAccessOptions,
  Track,
} from "@/types";
import { PlaylistModel, PlaylistSchema } from "@/models";
import mongoose, { Types } from "mongoose";

import { getColors } from "../getColors";
import { newInternalError } from "@/utils";

type NewPlaylist = {
  title: string;
  description?: string;
  author: Playlist["author"];
  thumbnails?: Playlist["thumbnails"];
  tracks: Track[];
  compressed?: boolean;
  permissions?: AccessControlList<PlaylistAccessOptions>;
};

type createPlaylistOptions = {
  session?: mongoose.mongo.ClientSession;
};

export const createPlaylist = async (
  props: NewPlaylist,
  { session }: createPlaylistOptions = {}
) => {
  try {
    const id = new Types.ObjectId();

    if (!props.thumbnails)
      props.thumbnails = [
        {
          url: "https://zyae.net/static/images/music/playlists/default-playlist.png",
          height: 512,
          width: 512,
        },
      ];

    const palette = await getColors(props.thumbnails[0].url);

    const playlist: PlaylistSchema = {
      ...props,
      _id: id,
      id: id.toString(),
      palette,
      thumbnails: props.thumbnails,
      year: new Date().getFullYear().toString(),
      trackCount: props.tracks?.length || 0,
      duration: "not implemented",
      permissions: props.permissions || {
        default: ["view"],
      },
    };

    const doc = new PlaylistModel(playlist);

    await doc.save({ session });

    return doc;
  } catch (err) {
    if (err instanceof AppError) throw err;
    else throw newInternalError(err);
  }
};
