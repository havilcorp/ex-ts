import e = require("express");
import MainController from "../controllers/MainController";

const router = e.Router()

router.get("/", MainController.main)
export default router