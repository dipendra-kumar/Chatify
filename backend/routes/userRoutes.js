const router = require("express").Router();
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const { secure } = require("../middleware/authMiddleware");

router.route("/").post(registerUser);
router.post("/search", (secure, allUsers));
router.route("/login").post(authUser);
module.exports = router;
