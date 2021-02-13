import { model, Schema, Types } from "mongoose";
import { ModelDefinition, ModelDocument, ModelOptions } from "../@types/model";

// Интерфейс модели
export interface ISubscribe {
  type: "user" | "group" | 0 | 1;
  from: Types.ObjectId; // User Id
  to: Types.ObjectId; // Id of User or Group
  accepted?: boolean; // Принято (to - Для юзеров и приватных групп) - false
  canceled?: boolean; // Отменено (from) отправителем - false
}

// Определение схемы модели
const definition: ModelDefinition<ISubscribe> = {
  type: { type: String, enum: ["user", "group"], required: true },
  from: { type: Types.ObjectId, required: true },
  to: { type: Types.ObjectId, required: true },
  accepted: { type: Boolean, default: false },
  canceled: { type: Boolean, default: false },
};

// Доп.параметры модели
const options: ModelOptions = {
  timestamps: {
    updatedAt: "updatedAt",
    createdAt: "createdAt",
  },
};
export const Subscribe = model<ModelDocument<ISubscribe>>("Subscribe", new Schema(definition, options));
