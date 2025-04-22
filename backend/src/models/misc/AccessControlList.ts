import { Model, Schema } from "mongoose";

import { AccessControlList } from "@/types";

export type AccessControlListSchema = AccessControlList<string>;

type AccessControlListModel = Model<AccessControlListSchema>;

export const accessControlListSchema = new Schema<
  AccessControlListSchema,
  AccessControlListModel
>(
  {
    default: {
      type: [String],
      default: [],
    },
    users: { type: Map, of: [String], default: {} },
  },
  { _id: false }
);
