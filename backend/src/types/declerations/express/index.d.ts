import { Session, ZyaeUser } from "@/types/api";
import { Types } from "mongoose";

declare global {
  namespace Express {
    interface Locals {
      route: string;
      tokens: { sid: string; at: string; rt: string };
      session?: Session;
      user: {
        _id: Types.ObjectId;
        profile: {
          firstName: string;
          email: string;
          thumbnail: string;
          lastName?: string | undefined;
        };
        preferences: {
          language: string;
        };
        flags: {
          isEmailVerified: boolean;
        };
      };
    }
  }
}
