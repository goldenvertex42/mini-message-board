const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.displayMessages);
indexRouter.get("/new", indexController.createMessageGet);
indexRouter.post("/new", indexController.createMessagePost);
indexRouter.get("/:messageID", indexController.displayMessageDetails);

module.exports = indexRouter;
