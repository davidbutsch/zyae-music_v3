import { AppError, AppResponse, NotFoundError, Playlist } from "@/types";
import { NextFunction, Request, Response } from "express";
import { createPlaylist, validate } from "@/shared";

import { JoiNewPlaylist } from "@/schemas";
import { UserModel } from "@/models";
import mongoose from "mongoose";
import { newInternalError } from "@/utils";
import Joi from "joi";

export const createNewPlaylist = async (
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

    const zyaeUser = res.locals.user;

    if (!zyaeUser) throw new NotFoundError("User not found");

    const playlist = req.body.playlist;

    const newPlaylist = await createPlaylist({
      title: playlist.title,
      description: playlist.description,
      author: {
        name: zyaeUser.profile.firstName,
        id: zyaeUser._id.toString(),
      },
      tracks: [],
      permissions: {
        default: playlist.public ? ["view"] : [],
        users: {
          [zyaeUser._id.toString()]: [
            "view",
            "edit:tracks",
            "edit:metadata",
            "delete",
          ],
        },
      },
    });

    const user = await UserModel.findById(zyaeUser._id);

    if (!user) throw new NotFoundError("User not found");

    user?.saved.push({
      id: newPlaylist.id,
      thumbnails: newPlaylist.thumbnails,
      type: "playlist",
      title: playlist.title,
      sub: `Playlist • ${newPlaylist.author.name}`,
    });
    await user.save();

    const response: AppResponse<Playlist> = {
      data: { playlist: newPlaylist },
    };

    res.json(response);
  } catch (err) {
    if (err instanceof AppError) return next(err);
    else return next(newInternalError(err));
  }
};
