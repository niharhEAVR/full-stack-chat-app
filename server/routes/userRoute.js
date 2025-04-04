const { register,login,avatar,setAvatar } = require("../controllers/userController");
const router  = require("express").Router();


router.post("/register", (register));
router.post("/login", (login));
router.get("/getAvatars/:id", (avatar));
router.post("/setAvatar/:userId", (setAvatar));

module.exports = router;