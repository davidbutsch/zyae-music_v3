import { AppError, User } from "@/types";

import { UserModel } from "@/models";
import { createPlaylist } from "@/shared";
import { newInternalError } from "@/utils";
import { Types } from "mongoose";

export const createUser = async (
  id: Types.ObjectId,
  name: string,
  thumbnail: string
) => {
  try {
    const savedTracksPlaylist = await createPlaylist({
      title: "Saved Tracks",
      author: {
        name,
        id: id.toString(),
      },
      thumbnails: [
        {
          url: "https://zyae.net/static/images/music/playlists/savedtracks.png",
          width: 544,
          height: 544,
        },
      ],
      tracks: [],
      permissions: {
        users: {
          [id.toString()]: ["view", "edit:tracks"],
        },
      },
    });

    const user: User = {
      _id: id,
      profile: {
        displayName: name,
        thumbnails: [{ height: 50, width: 50, url: thumbnail }],
      },
      saved: [
        {
          id: savedTracksPlaylist.id,
          thumbnails: savedTracksPlaylist.thumbnails,
          type: "playlist",
          title: savedTracksPlaylist.title,
          sub: `Playlist • ${name}`,
        },
      ],
      tracksId: savedTracksPlaylist.id,
      recentlyPlayed: { tracks: [], playlists: [], albums: [] },
    };

    const doc = new UserModel(user);

    await doc.save();

    return user;
  } catch (err) {
    if (err instanceof AppError) throw err;
    else throw newInternalError(err);
  }
};
