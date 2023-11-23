const express = require("express");
const router = express.Router()
const userController = require("../controllers/user");

router.get("/",userController.get_Register);

router.get("/:id", userController.get_id_Register);

router.post("/",  userController.post_Register);

router.put("/:id",  userController.put_Register);

router.delete("/:id",  userController.delete_Register);

router.post("/login" ,userController.post_login)



module.exports = router;