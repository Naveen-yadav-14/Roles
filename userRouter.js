const userController = require("./controller/userController");

const userRouter = require("express").Router();

userRouter.post("/signup", userController.signUp);

module.exports = userRouter;