import { Playlist } from "@/types";
import { Types } from "mongoose";

export const getUserAccess = (
  playlist: Playlist,
  zyaeUserId?: string | Types.ObjectId
) => {
  const userAccess = [
    ...new Set([
      ...(playlist.permissions.default || []),
      ...(playlist.permissions.users?.[zyaeUserId?.toString() || ""] || []),
    ]),
  ];
  return userAccess;
};
