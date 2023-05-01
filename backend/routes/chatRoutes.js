const router = require("express").Router();
const { accessChat, fetchChats } = require("../controllers/chatControllers");
const { secure } = require("../middleware/authMiddleware");

router.route("/").post(secure, accessChat).get(secure, fetchChats);


module.exports = router;
