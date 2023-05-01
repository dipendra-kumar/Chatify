const Message = require("../models/messageModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");
const Chat = require("../models/chatModel");

const { fileModel } = require("../models/fileModel");

// @desc		Send message
// @route		POST /messages
// @access		Private
const sendMessage = asyncHandler(async (req, res) => {
  const { content, contentType, chatId } = req.body;
  console.log(req.body);

  const file = req.files
  if (file) {
    console.log('file')
  }


  // check for error
  if (!content || !chatId) {
    return res.status(400).json({
      error: "Bad request",
      message: "Server could not process Invalid request",
    });
  }
  // message object
  var newMessage = {
    sender: req.user._id,
    content: content,
    contentType: contentType,
    chatId: chatId,
  };
  // query DB
  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name image");
    message = await message.populate("chatId");
    message = await User.populate(message, {
      path: "chatId.users",
      select: "name image email",
    });
    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message,
    });
    res.json(message);
  } catch (err) {
    res.status(400);
    throw new Error("Server could not process request");
  }
});

// @desc		Fetch all the messages
// @route		GET /message:chatId
// @access		Private
const fetchMessage = asyncHandler(async (req, res) => {
  const { chatId } = req.body;
  try {
    const allMessages = await Message.find({ chatId })
      .populate("sender", "name image email")
      .populate("chatId");
    res.json(allMessages);
  } catch (err) {
    res.status(400);
    throw new Error("Server could not process request");
  }
});

const uploadAttachments = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  res.send(req.body);
  // try {
  //   if (!req.body) {
  //     res.send("File was not found");
  //     return;
  //   }
  //   var file = req.files;
  //   console.log(file.data);
  //   var obj = {
  //     name: file.name,
  //     size: file.size,
  //     img: {
  //       data: file.data,
  //       contentType: file.mimetype,
  //     },
  //   };
  //   const item = new fileModel(obj);
  //   // let savedFile = await item.save();
  //   res.send(item);
  // } catch (error) {
  //   res.status(400).send(error.message);
  // }
});

module.exports = { sendMessage, fetchMessage, uploadAttachments };
