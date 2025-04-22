import { FlattenMaps, Types } from "mongoose";
import { User } from "./User";

export type LeanedUserDoc = FlattenMaps<User> &
  Required<{
    _id: Types.ObjectId;
  }>;
