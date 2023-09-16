import { NextFunction, Request, Response } from "express";

import { AppError } from "@/types";
import { fetchAlbumData } from "../services";
import { newInternalError } from "@/utils";

export const getAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const albumId = req.params.albumId;
    const album = await fetchAlbumData("GetAlbum", albumId);

    res.json({ data: { album } });
  } catch (err) {
    if (err instanceof AppError) return next(err);
    else return next(newInternalError("GetAlbum", err));
  }
};
