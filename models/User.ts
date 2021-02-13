import { model, Schema, Types } from "mongoose";
import { ModelDefinition, ModelDocument, ModelOptions } from "../@types/model";

// Интерфейс модели
export interface IUser {
  email: string;
  password_hash: string;
  photo?: string;
  invited?: Types.ObjectId;
  birthday?: Date;
}

// Определение схемы модели
const definition: ModelDefinition<IUser> = {
  email: { type: String, unique: true, required: true },
  password_hash: { type: String, unique: true, required: true },
  photo: { type: String, default: "default_user" },
  invited: { type: Types.ObjectId, default: "" },
  birthday: { type: Date, default: new Date("2002-08-04") },
};

// Доп.параметры модели
const options: ModelOptions = {
  timestamps: {
    updatedAt: "updatedAt",
    createdAt: "createdAt",
  },
};
export const User = model<ModelDocument<IUser>>("User", new Schema(definition, options));
