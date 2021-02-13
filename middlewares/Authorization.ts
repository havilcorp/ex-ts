import { NextFn, Req, Res } from "../@types/app";
import { ModelDocument } from "../@types/model";
import { IUser, User } from "../models/User";
import JWT from "../utils/JWT";

export default class Authorization {
  static async modifyRequestData(req: Req, res: Res, next: NextFn): Promise<void> {
    if (req.session.token === undefined) {
      // Есть ли токен
      req.session.user = {
        isAuth: false,
        data: null,
      };
      return next();
    }

    let tokenData = await JWT.verifyToken(req.session.token);
    if (tokenData.status === false) {
      // Валидный ли токен
      delete req.session.token;
      req.session.user = {
        isAuth: false,
        data: null,
      };
      return next();
    }

    let condidate: ModelDocument<IUser> = await User.findById(tokenData.id);
    if (!condidate) {
      // Есть ли юзер
      delete req.session.token;
      req.session.user = {
        isAuth: false,
        data: null,
      };
      return next();
    }

    req.session.user = {
      isAuth: true,
      data: condidate,
    };
    return next();
  }
}
