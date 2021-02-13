import e = require("express");

import main from "./main";

const router = e.Router()

router.use("/", main)
export default router