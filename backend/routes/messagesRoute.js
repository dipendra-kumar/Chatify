const router = require("express").Router();
const { secure } = require("../middleware/authMiddleware");
const {
  sendMessage,
  fetchMessage,
  uploadAttachments
} = require("../controllers/messageController");

// Route to send the message to the recipient
router.route("/").post(secure, sendMessage);
// Route to retrieve all the message
router.route("/fetchMessages").post(secure, fetchMessage);

router.post('/uploadAttachments', (secure, uploadAttachments));

module.exports = router;
