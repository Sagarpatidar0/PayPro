const express = require("express");
const { zodLogin, zodSignup, zodUpdate } = require("../models/zod");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User, Account } = require('../models/user.model')
const userRouter = express.Router();
const { authMiddleware } = require('../middleware')

userRouter.use('/user', authMiddleware, (req, res) => {
    let body = req.body.username;
    User.findOne({ email: req.body.username })
        .then((data) => {
            if (!data) {
                res.status(404).json({
                    message: "User not found"
                })
            }
            else {
                res.status(200).json({
                    message: "ok",
                    User: {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email
                    }
                })
            }
        })
        .catch(() => {
            res.status(404).json({
                message: "Error occured in searching"
            })
        })
})
userRouter.post('/signup', async (req, res) => {
    const body = req.body;
    if (zodSignup.safeParse(body).success) {
        await User.findOne({ email: body.email })
            .then((result) => {
                if (!result?._id) {
                    User.create(body)
                        .then((data) => {
                            const userId = data._id
                            Account.create({
                                userId,
                                balance: 1 + Math.random() * 10000
                            })
                            const token = jwt.sign({ email: data.email, userId: data._id }, process.env.JWT_SECRET);
                            res.status(200).json({
                                message: "User created successfully",
                                token: token
                            })
                        })
                        .catch((e) => {
                            console.log("Error in writing database", e);
                        })
                }
                else {
                    res.status(500).json({
                        message: "User already exists"
                    })
                }
            })
    }
    else {
        res.status(200).json({
            message: "Invalid Input"
        })
    }
});
userRouter.post('/signin', (req, res) => {
    let body = req.body;
    if (zodLogin.safeParse(body).success) {
        User.findOne(body)
            .then((data) => {
                console.log(data);
                if (data == null) {
                    res.status(404).json({
                        message: "Invalid username or password"
                    })
                }
                const token = jwt.sign({ email: data.email, userId: data._id }, process.env.JWT_SECRET);
                res.status(200).json({
                    message: "Successfully logged in",
                    token: token
                })
            })
            .catch((e) => {
                console.log("Error in writing database", e);
            })
    }
    else {
        res.status(500).json({
            message: "Invalid input"
        })
    }
})
userRouter.put('/update', authMiddleware, (req, res) => {
    let body = req.body;
    if (!zodUpdate.safeParse(req.body).success) {
        res.status(500).json({
            message: "Invalid input"
        })
    }
    User.updateOne({ _id: req.userId }, body)
        .then(() => {
            res.status(200).json({
                message: "successfully Updated"
            })
        })
        .catch(() => {
            res.status(411).json({
                message: "Something went wrong"
            })
        })
})
userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})
userRouter.get('/me', authMiddleware, (req, res) => {
    User.findOne({ _id: req.userId }, "-password -__v")
        .then((data) => {
            res.status(200).json(data)
        })
        .catch(() => {
            res.status(411).json({
                message: "Invalid token and user"
            })
        })
})
userRouter.get('/auth', authMiddleware, (req, res) => {
    res.status(200).json({
        message: "ok"
    })
})
module.exports = userRouter;