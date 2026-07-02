const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {

  const { username, email, password, role = "user"} = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    $or: [
      {username},
      {email}
    ]
  })

  if(isUserAlreadyExist){
    return res.status(409).json({message: "User already exist" })
  }

  const hash = await bcrypt.hash(password, 10)

  const user = await userModel.create({

    username,
    email,
    password: hash,
    role
  })

  const token = jwt.sign({
    id: user._id,
    role: user.role,
  }, process.env.JWT_SECRET)

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    }
  })
}

async function loginUser(req, res){

  const { username, email, password} = req.body;

  const user = await userModel.findOne({
    $or: [
      { username },
      { email }
    ]
  })

  if(!user){
    return res.status(401).json({message: "Invalid credentials"})
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if(!isPasswordValid){
    return res.status(401).json({message: "Invalid Credentials" })
  }

  const token = jwt.sign({
    id: user._id,
    role: user.role,
  }, process.env.JWT_SECRET)

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    }
  })
}

async function logoutUser(req, res){
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.status(200).json({ message: "User logged out successfully" })
}

async function getProfile(req, res) {

  console.log(req.user);

  const user = await userModel
  .findById(req.user.id)
  .select("-password");

  return res.status(200).json({
    user
  });

}

async function changePassword(req, res) {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const user = await userModel.findById(req.user.id);

    const isPasswordValid = await bcrypt.compare(
      oldPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Old password is incorrect"
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message: "Password changed successfully"
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

module.exports = { registerUser, loginUser, logoutUser, getProfile, changePassword }