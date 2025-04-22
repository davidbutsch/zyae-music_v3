import { NextFunction, Request, Response } from "express";

import { AppError } from "@/types";
import { getColors } from "@/shared";
import { newInternalError } from "@/utils";

export const temp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const palette = await getColors(req.query.url as string);

    res.json(palette);
  } catch (err) {
    if (err instanceof AppError) return next(err);
    else return next(newInternalError(err));
  }
};
