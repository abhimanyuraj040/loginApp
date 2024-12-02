import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";

/**
 * http://localhost:8000/api/register
 * @param {*} req
 * @param {*} res
 
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

    //checking the existing user
    const existUsername = new Promise((resolve, reject) => {
      UserModel.findOne({ username }, function (err, user) {
        if (err) reject(new Error(err));
        if (user) reject({ error: "please use unique username" });
        resolve();
      });
    });

    //checking the existing email
    const existEmail = new Promise((resolve, reject) => {
      UserModel.findOne({ email }, function (err, email) {
        if (err) reject(new Error(err));
        if (email) reject({ error: "This email is already registered" });
        resolve();
      });
    });

    Promise.all([existUsername, existEmail])
      .then(() => {
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              const user = new UserModel({
                username,
                password: hashedPassword,
                profile: profile || "",
                email: email,
              });

              //return save result as a response
              user
                .save()
                .then((result) =>
                  res.status(201).send({ msg: "User Register Successfully" })
                )
                .catch((error) => res.status(500).send(error));
            })
            .catch((error) => {
              return res.status(500).send({
                error: "Enable to hashed password inside",
              });
            });
        }
      })
      .catch((error) => {
        return res.status(500).send({
          error: "Enable to hashed password outside",
        });
      });
  } catch (error) {
    res.status(500).json("you got some error", error);
  }
}

/**
 * username
 * password
 */

export async function login(req, res) {
  res.json("login route");
}

//http:localhost:8000/api/example123
export async function getUser(req, res) {
  res.json("getUser route");
}

/**
 *
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

export async function generatorOTP(req, res) {
  res.json("generateOTP  route");
}

export async function verifyOTP(req, res) {
  res.json("verifyOTP route");
}

export async function createResetSession(req, res) {
  res.json("createResetSession route");
}

export async function resetPassword(req, res) {
  res.json("resetPassword route");
}
