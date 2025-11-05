const userController = require("../controller/userController");

const userRouter = require("express").Router();

userRouter.post("/create", userController.create);

module.exports = userRouter;