import { NextFunction, Request, Response } from "express";

import { AppError } from "@/types";
import { fetchArtistDiscography } from "../services";
import { newInternalError } from "@/utils";

export const getArtistDiscography = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const artistId = req.params.artistId;
    const discography = await fetchArtistDiscography(
      "GetArtistDiscography",
      artistId
    );

    res.json({ data: { discography } });
  } catch (err) {
    if (err instanceof AppError) return next(err);
    else return next(newInternalError("GetArtistDiscography", err));
  }
};
