const {Router} = require("express");
const authController = require("../controllers/auth.controller");
const authmiddleware = require("../middlewares/auth.middleware")

const authRouter = Router()

/**
 * @routes POST/api/auth/register 
 * @description register a new user 
 * @access Public
 */

authRouter.post("/register",authController.registerUserController);


/**
 * @routes Post/api/auth/login 
 * @description login user with email and password
 * @access public 
 */

authRouter.post("/login",authController.loginusercontroller)

/**
 * @routes get/api/auth/logout 
 * @description clear token from user cookie and add token in the blacklist 
 * @access public
 */
authRouter.get("/logout",authController.logoutUserController)


/**
 * @routes get/api/auth/get-me 
 * @description get the current logged in user details 
 * @access private
 */
authRouter.get("/get-me",authmiddleware.authUser,authController.getMeController)


module.exports = authRouter 

//33 minutes pause time ::keep doing 