import { Req, Res } from "../@types/app";

export default class MainController {
  static async main(req: Req, res: Res) {
    if (req.session.user.isAuth) {
      return res.redirect("/feed");
    }
    
    return res.render("main", {
      title: "Главная",
    });
  }
}
