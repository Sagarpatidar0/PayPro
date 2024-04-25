const express = require("express");
const mongoose = require("mongoose");
const { zodLogin, zodSignup, zodUpdate } = require("../models/zod");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User, Account } = require('../models/user.model')
const accountRouter = express.Router();
const { authMiddleware } = require('../middleware')

accountRouter.get('/balance' , authMiddleware , async (req , res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
})

accountRouter.post('/transfer' , authMiddleware , async (req , res) => {
        const session = await mongoose.startSession();
    
        session.startTransaction();
        const { amount, to } = req.body;
        // Fetch the accounts within the transaction
        const account = await Account.findOne({ userId: req.userId }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }
        if (amount < 0) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid amount"
            });
        }
    
        const toAccount = await Account.findOne({ userId: to }).session(session);
    
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            });
        }
    
        // Perform the transfer
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
    
        // Commit the transaction
        await session.commitTransaction();
        res.json({
            message: "Transfer successful"
        });
})
module.exports = {
    accountRouter
}

//Bade code for transaction Instead use transaction Functions in DB.

// router.post("/transfer", authMiddleware, async (req, res) => {
//     const { amount, to } = req.body;

//     const account = await Account.findOne({
//         userId: req.userId
//     });

//     if (account.balance < amount) {
//         return res.status(400).json({
//             message: "Insufficient balance"
//         })
//     }

//     const toAccount = await Account.findOne({
//         userId: to
//     });

//     if (!toAccount) {
//         return res.status(400).json({
//             message: "Invalid account"
//         })
//     }

//     await Account.updateOne({
//         userId: req.userId
//     }, {
//         $inc: {
//             balance: -amount
//         }
//     })

//     await Account.updateOne({
//         userId: to
//     }, {
//         $inc: {
//             balance: amount
//         }
//     })

//     res.json({
//         message: "Transfer successful"
//     })
// });