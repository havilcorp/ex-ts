import { join } from "path";
import { MONGO_URI, PORT, SECRET } from "./config";
import Authorization from "./middlewares/Authorization";
import ExpressModify from "./middlewares/ExpressModify";
import router from "./routes";
import Logger from "./utils/Logger";
import express = require("express");
import helmet = require("helmet");
import compression = require("compression");
import mongoose = require("mongoose");
import express_minify = require("express-minify");

const app = express();

app.engine("hbs", ExpressModify.hbsRender);
app.set("view engine", "hbs");

app.use(helmet());
app.use(compression());

app.use("/assets", express_minify({ cache: false }), express.static(join(__dirname, "assets")));

app.use(ExpressModify.session({ secret: SECRET, uri: MONGO_URI }));
app.use(Authorization.modifyRequestData);

app.use("/", router);

app.use(ExpressModify.errorPage);

(async function () {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
    app.listen(PORT, () => {
      Logger.success(`Server listen: ${PORT}`);
    });
  } catch (error) {
    Logger.error("ROOT error:");
  }
})();
