const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    res.status(400);
    throw new Error("Please Enter all fields!");
  }

  if (password != confirmPassword) {
    res.status(400);
    throw new Error("Passwords do not match!");
  }
  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists!");
  }
  const user = await UserModel.create({ name, email, password });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the User");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body)
  if (!email || !password) {
    res.status(400);
    throw new Error("Fill all required fields.");
  }

  const user = await UserModel.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Username or password");
  }
});

const allUsers = asyncHandler(async (req, res) => {
  try {
    const keyword = req.body.search
      ? {
        $or: [
          { name: { $regex: req.body.search, $options: "i" } },
          { email: { $regex: req.body.search, $options: "i" } },
        ],
      }
      : {};

    console.log(keyword)

    const users = await UserModel.find(keyword).find({
      _id: { $ne: req.body._id },
    });
    res.status(200).send(users);
  } catch (err) {
    console.log(err)
  }
});

module.exports = { registerUser, authUser, allUsers };
