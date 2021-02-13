import mongodb_session_store = require("connect-mongodb-session");
import session = require("express-session");
import evehbs = require("express-handlebars");
import html_minifier = require("html-minifier");
import { Req, Res } from "../@types/app";

interface SessionMiddlewareOptions {
  secret: string; // Secret key
  uri: string; // Mongo DB uri
  maxAge?: number; // 7 * 24 * 60 * 60 * 1000, // 7 days
}

interface TemplateDataObject {
  title: string
  isAuth: boolean

  [key: string]: any
}

export default class ExpressModify {
  static HBS = evehbs.create({ defaultLayout: "default", extname: "hbs" });
  static hbsRender(p: string, o: TemplateDataObject, c: any) {
    ExpressModify.HBS.renderView(p, o, (e, v) => {
      c(
        e,
        html_minifier.minify(v, {
          removeComments: true,
          removeTagWhitespace: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeEmptyElements: false,
          removeOptionalTags: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          minifyJS: true,
          minifyCSS: true,
        })
      );
    });
  }

  static session(options: SessionMiddlewareOptions): any {
    const MongoDBStore = mongodb_session_store(session);
    const store = new MongoDBStore({
      uri: options.uri,
      collection: "client_sessions",
    });

    return session({
      secret: options.secret,
      resave: false,
      saveUninitialized: true,
      cookie: {
        signed: true,
        maxAge: options.maxAge ?? 7 * 24 * 60 * 60 * 1000, // 7 days
      },
      store: store,
    });
  }

  static errorPage(req: Req, res: Res) {
    res.render("error", { title: "Error" });
  }
}
