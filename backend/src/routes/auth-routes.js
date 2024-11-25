const express=require("express")
const router=express.Router();
const user_controller=require("../controllers/auth-controller")

router.post("/register",user_controller.register)
router.post("/login",user_controller.login)

module.exports=router;