const express = require('express');
const {register,login,logout,getotherusers} = require('../controllers/userController.js');
const auth = require('../middleware/auth.js');

const userRoute = express.Router();

userRoute.post("/register",register)
userRoute.post("/login",login)
userRoute.get("/logout",logout)
userRoute.get("/otheruser",auth, getotherusers)




module.exports = userRoute;