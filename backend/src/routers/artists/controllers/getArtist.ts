import { NextFunction, Request, Response } from "express";

import { AppError } from "@/types";
import { fetchArtistData } from "../services";
import { newInternalError } from "@/utils";

export const getArtist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const artistId = req.params.artistId;
    const artist = await fetchArtistData("GetArtist", artistId);

    res.json({ data: { artist } });
  } catch (err) {
    if (err instanceof AppError) return next(err);
    else return next(newInternalError("GetArtist", err));
  }
};
