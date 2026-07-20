const usermodel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenBlackListModel = require('../models/blacklist.model')

/**
 * @name registerUserController
 * @description Register a new user, expects username, email and password in the request body.
 * @access Public
 */
async function registerUserController(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please provide username, email and password"
            });
        }

        const useralreadyexists = await usermodel.findOne({
            $or: [{ username }, { email }]
        });

        if (useralreadyexists) {
            return res.status(400).json({
                message: "User already exists with this username or email"
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await usermodel.create({
            username,
            email,
            password: hash
        });

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.cookie("token", token);

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

/**
 * @name loginusercontroller
 * @description Login a user, expects email and password in the request body.
 * @access Public
 */
async function loginusercontroller(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password"
            });
        }

        const user = await usermodel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const ispassvalid = await bcrypt.compare(password, user.password);

        if (!ispassvalid) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.cookie("token", token);

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

// async function logoutUserController(req,res){
//     const token = req.cookies.token

//     console.log(req.cookies);
//     console.log(req.cookies.token);

//     if(token){
//         await tokenBlackListModel.create({token})
//     }
//     res.clearCookie("token")

//     res.status(200).json({
//         message :"User logout Successfully"
//     })

// }

/**
 * 
 * @name {logoutUserController}  
 * @description {clear token form cookies and add the topken in blacklist}  
 * @access public 
 */
async function logoutUserController(req, res) {
    try {
        const token = req.cookies.token;

        console.log("Cookies:", req.cookies);
        console.log("Token:", token);

        if (token) {
            const saved = await tokenBlackListModel.create({ token });
            console.log("Saved in DB:", saved);
        } else {
            console.log("No token found in cookies.");
        }

        res.clearCookie("token");

        return res.status(200).json({
            message: "User logout Successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

/**
 * @name getMeController 
 * @description get the current in user details.
 * @access private 
 */
async function getMeController(req,res){
    const user = await usermodel.findById(req.user.id)
    res.status(200).json({
        message:"User details fetched successfully",
        user:{
            id :user._id,
            username:user.username,
            email:user.email 
        } 
    })
}

module.exports = {
    registerUserController,
    loginusercontroller,
    logoutUserController,
    getMeController
};

//timing 1:04: youtube 
