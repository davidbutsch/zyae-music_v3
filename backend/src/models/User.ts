import { Model, Schema, Types, model } from "mongoose";

export interface User {
  _id: Types.ObjectId;
}

type UserModelType = Model<User>;

export const userSchema = new Schema<User, UserModelType>({
  _id: Schema.Types.ObjectId,
});

export const UserModel = model<User, UserModelType>("User", userSchema);
