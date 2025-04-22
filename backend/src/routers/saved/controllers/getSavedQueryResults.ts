import { AppError, AppResponse, GenericCard, NotFoundError } from "@/types";
import { NextFunction, Request, Response } from "express";

import FuzzySearch from "fuzzy-search";
import Joi from "joi";
import { JoiReqString } from "@/schemas";
import { UserModel } from "@/models";
import { newInternalError } from "@/utils";
import { validate } from "@/shared";

export const getSavedQueryResults = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validate(
      req.params,
      "params",
      Joi.object({
        query: JoiReqString,
      }).required()
    );

    const query = req.params.query;
    const user = await UserModel.findById(res.locals.session?.userId).lean();

    if (!user) throw new NotFoundError("User not found");
    const saved = user.saved;

    const savedSearcher = new FuzzySearch(saved, [
      "id",
      "title",
      "sub",
      "type",
    ]);
    const result = savedSearcher.search(query);

    const response: AppResponse<GenericCard[]> = {
      data: {
        results: result,
      },
    };

    res.json(response);
  } catch (err) {
    if (err instanceof AppError) return next(err);
    else return next(newInternalError(err));
  }
};
