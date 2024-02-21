const express = require("express");
const userRouter = express.Router();
const {signup, login, logout, protectedRoute, refreshToken}= require("../../Controller/User/user");
const { validateSignup, validateLogin } = require("../../Controller/User/userValidation");
const { authenticate } = require("../../Middleware/authMiddleware");

userRouter.post("/registeruser", validateSignup, signup);
userRouter.post("/loginuser", validateLogin, login);
userRouter.post("/logout", logout);
userRouter.get("/protect", authenticate,  protectedRoute);
userRouter.get("/refreshtoken", refreshToken)

module.exports = userRouter;







