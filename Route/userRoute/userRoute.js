const express = require("express");
const userRouter = express.Router();
const {signup, login, logout}= require("../../Controller/User/user");

userRouter.post("/registeruser", signup);
userRouter.post("/loginUser", login);
userRouter.post("/logout", logout);

module.exports = userRouter;







