import {
  AppError,
  AppResponse,
  NotFoundError,
  PlaylistAccessOptions,
  ResponsePlaylist,
} from "@/types";
import { NextFunction, Request, Response } from "express";
import { PlaylistModel, UserModel } from "@/models";

import Joi from "joi";
import { JoiNewPlaylist } from "@/schemas";
import { getUserAccess } from "@/shared";
import { newInternalError } from "@/utils";
import { validate } from "@/shared";

type UpdatePlaylist = {
  title?: string;
  description?: string;
  public?: boolean;
};

const updateUserPlaylistCard = async (
  userId: string,
  playlistId: string,
  updatePlaylist: UpdatePlaylist
) => {
  const user = await UserModel.findById(userId);

  if (!user) throw new NotFoundError("User not found");

  const playlistCard = user.saved.find(
    (savedCard) => savedCard.id == playlistId
  );

  if (playlistCard) {
    if (updatePlaylist.title) playlistCard.title = updatePlaylist.title;
  }

  await user.save();
};

export const updatePlaylist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validate(
      req.body,
      "body",
      Joi.object({ playlist: JoiNewPlaylist }).required()
    );

    const zyaeUserId = res.locals.session?.userId;

    if (!zyaeUserId) throw new NotFoundError("User id not found");

    const updatePlaylist: UpdatePlaylist = req.body.playlist;

    const playlistId = req.params.playlistId;

    const playlist = await PlaylistModel.findById(playlistId);

    if (!playlist) throw new NotFoundError("Playlist not found");

    if (updatePlaylist.title) playlist.title = updatePlaylist.title;
    if (updatePlaylist.description)
      playlist.description = updatePlaylist.description;

    if (updatePlaylist.public)
      playlist.permissions.default = [
        ...new Set<PlaylistAccessOptions>([
          ...(playlist.permissions.default || []),
          "view",
        ]),
      ];
    else if (updatePlaylist.public == false)
      playlist.permissions.default = (
        playlist.permissions.default || []
      ).filter((permission) => permission !== "view");

    const userAccess = getUserAccess(playlist, zyaeUserId);

    const newPlaylist = await playlist.save();
    const { _id, permissions, ...omittedPlaylist } = newPlaylist.toObject();

    const responsePlaylist: ResponsePlaylist = {
      ...omittedPlaylist,
      userAccess,
    };

    if (!userAccess.includes("edit:metadata"))
      responsePlaylist.permissions = permissions;

    await updateUserPlaylistCard(
      zyaeUserId.toString(),
      playlistId,
      updatePlaylist
    );

    const response: AppResponse<ResponsePlaylist> = {
      data: {
        playlist: responsePlaylist,
      },
    };

    res.json(response);
  } catch (err) {
    if (err instanceof AppError) return next(err);
    else return next(newInternalError(err));
  }
};
