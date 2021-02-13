import { model, Schema, Types } from "mongoose";
import { ModelDefinition, ModelDocument, ModelOptions } from "../@types/model";

// Интерфейс модели
export interface IPost {
  type: "user" | "group" | 0 | 1;
  from: Types.ObjectId;
  author: Types.ObjectId;
  text: string;
}

// Определение схемы модели
const definition: ModelDefinition<IPost> = {
  type: { type: String, enum: ["user", "group"], required: true },
  from: { type: Types.ObjectId, required: true },
  author: { type: Types.ObjectId, required: true },
  text: { type: String, required: true },
};

// Доп.параметры модели
const options: ModelOptions = {
  timestamps: {
    updatedAt: "updatedAt",
    createdAt: "createdAt",
  },
};
export const Post = model<ModelDocument<IPost>>("Post", new Schema(definition, options));
