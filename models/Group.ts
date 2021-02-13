import { model, Schema, Types } from "mongoose";
import { ModelDefinition, ModelDocument, ModelOptions } from "../@types/model";

// Интерфейс модели
export interface IGroup {
  name: string;
  creater: Types.ObjectId;
  owners: Array<Types.ObjectId>;
  photo?: string;
}

// Определение схемы модели
const definition: ModelDefinition<IGroup> = {
  name: { type: String, unique: true, required: true },
  photo: { type: String, default: "default_group" },
  creater: { type: Types.ObjectId, required: true },
  owners: [{ type: Types.ObjectId, require: true }],
};

// Доп.параметры модели
const options: ModelOptions = {
  timestamps: {
    updatedAt: "updatedAt",
    createdAt: "createdAt",
  },
};
export const Group = model<ModelDocument<IGroup>>("Group", new Schema(definition, options));
