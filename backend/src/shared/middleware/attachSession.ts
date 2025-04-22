import { AppError, CookieTokens, Session } from "@/types";
import { NextFunction, Request, Response } from "express";
import mongoose, { Schema } from "mongoose";

import { newInternalError } from "@/utils";
import { redis } from "@/loaders";
import { validateSessionTokens } from "../services";

export const attachSession =
  (
    flags: { checkExists: boolean; checkExpired: boolean } = {
      checkExists: true,
      checkExpired: true,
    }
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (flags.checkExists) validateSessionTokens(req.cookies);

      const tokens: CookieTokens = req.cookies;

      const userSession = await redis.ft.search(
        "idx:session",
        `@accessToken:(${tokens.at})`
      );

      const session = userSession.documents[0]?.value;

      if (!session) return next();

      res.locals.session = session as any;

      const userId = session.userId;

      var authdb = mongoose.createConnection(
        "mongodb://127.0.0.1:27017/zyaeauth"
      );

      const profileSchema = new Schema(
        {
          firstName: { type: String, required: true },
          lastName: { type: String },
          email: { type: String, required: true },
          thumbnail: { type: String, required: true },
        },
        { _id: false }
      );

      const preferencesSchema = new Schema(
        {
          language: {
            type: String,
            required: true,
            default: "en",
          },
        },
        { _id: false }
      );

      const flagsSchema = new Schema(
        {
          isEmailVerified: {
            type: Boolean,
            required: true,
            default: false,
          },
        },
        { _id: false }
      );

      const metadataSchema = new Schema(
        {
          createdAt: {
            type: String,
            required: true,
            default: () => new Date().toISOString(),
          },
        },
        { _id: false }
      );

      const securitySchema = new Schema(
        {
          password: { type: String, default: null },
        },
        { _id: false }
      );

      const userSchema = new Schema({
        // base user properties
        profile: { type: profileSchema, required: true },
        preferences: {
          type: preferencesSchema,
          required: true,
          default: {},
        },
        flags: { type: flagsSchema, required: true, default: {} },
        metadata: { type: metadataSchema, required: true, default: {} },

        // local properties
        security: { type: securitySchema, required: true, default: {} },
      });

      const ZyaeUserModel = authdb.model("User", userSchema);

      const zyaeUser = await ZyaeUserModel.findById(userId);

      res.locals.user = zyaeUser!;

      next();
    } catch (err) {
      if (err instanceof AppError) next(err);
      else next(newInternalError(err));
    }
  };
