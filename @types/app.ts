import { NextFunction, Request, Response } from "express";
import { IUser } from "../models/User";
import { ModelDocument } from "./model";

export type Req = Request & {
  session: {
    token: string | undefined
    user: {
      isAuth: boolean;
      data: ModelDocument<IUser> | null
    }
  }
}
export interface Res extends Response {}
export interface NextFn extends NextFunction {}
