import { model, Model, Schema } from "mongoose";

export interface UserI {
  _id: string;
  email: string;
  password: string;
  name: string;
}

const userSchema = new Schema<UserI>(
  {
    _id: { type: String, required: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      unique: true,
    },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const UserModel: Model<UserI> = model("User", userSchema);
