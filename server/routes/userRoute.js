const { register, login, avatar, setAvatar, getAllUsers } = require("../controllers/userController");
const router = require("express").Router();


router.post("/register", (register));
router.post("/login", (login));
router.get("/getAvatars/:id", (avatar));
router.post("/setAvatar/:userId", (setAvatar));
router.get("/allUsers/:id",getAllUsers)

module.exports = router;