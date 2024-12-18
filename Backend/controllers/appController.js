import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";

/**
 * http://localhost:8000/api/register
 * need to create user.model.js before calling api
    "username" : "example123",
    "password" : "admin123",
    "email" : "example@gmail.com",
    "firstName" : "bill",
    "lastName" : "william",
    "mobile" : 998724987,
    "address" : "something nagar, something area, something city",
    "profile" : ""
 */

export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;

    // Check if username exists
    const userByUsername = await UserModel.findOne({ username });
    if (userByUsername) {
      return res.status(400).json({ error: "Please use a unique username" });
    }

    // Check if email exists
    const userByEmail = await UserModel.findOne({ email });
    if (userByEmail) {
      return res
        .status(400)
        .json({ error: "This email is already registered" });
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const user = new UserModel({
        username,
        password: hashedPassword,
        profile: profile || "",
        email,
      });

      // Save user to database
      const result = await user.save();
      return res
        .status(201)
        .send({ msg: "User registered successfully", result });
    } else {
      return res.status(400).json({ error: "Password is required" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "you got some error please check here in detail", details: error.message });
  }
}

/**
 * username
 * password
 */

export async function login(req, res) {
  res.json("login route logic should be here");
}

//http:localhost:8000/api/example123
export async function getUser(req, res) {
  res.json("getUser route logic should be here");
}

/**
 * for update user
 * @param {
 * } req
 * @param {*} res
 * id
 * body:{
 * firstName:'',
 * address: '',
 * profile: ' '}
 */
export async function updateUser(req, res) {
  res.json("updateUser route");
}

//generate otp
export async function generatorOTP(req, res) {
  res.json("generateOTP  route");
}

//verify otp
export async function verifyOTP(req, res) {
  res.json("verifyOTP route working fine");
}

//Reset session
export async function createResetSession(req, res) {
  res.json("createResetSession route and working fine");
}

//reset password
export async function resetPassword(req, res) {
  res.json("resetPassword route and working fine");
}
