const express = require("express");
const userRouter = require("./user");
const { accountRouter } = require("./account");
const router = express.Router();
router.use('/user', userRouter)
router.use('/account' , accountRouter)
router.use('/', (req, res) => {
    res.status(200).json({
        headers: req.headers,
        status: "ok"
    })
})

module.exports = router