const router = require("express").Router()
const {verifyToken} = require("../middlewares/authMiddlewares")
const {getUser,postLogin,postSign,postLogout} = require("../controllers/authController")


router.get("/login",verifyToken,getUser)
router.post("/register",postSign)
router.post("/login",postLogin)
router.post("/logout",verifyToken,postLogout)

module.exports=router