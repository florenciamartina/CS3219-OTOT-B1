import {
  ormCreateUser as _createUser,
  ormGetUser as _getUser,
} from "../model/user/user-orm.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function createUser(req, res) {
  try {
    const { username, password } = req.body;
    let saltRounds = parseInt(process.env.SALT_ROUNDS);

    if (username && password) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const resp = await _createUser(username, hashedPassword);
      console.log("response controller: ");
      console.log(resp);
      if (resp.err) {
        if (
          resp.err.name &&
          resp.err.name === "MongoServerError" &&
          resp.err.code === 11000
        ) {
          return res
            .status(409)
            .json({ message: `User ${username} already exists` });
        }
        return res
          .status(400)
          .json({ message: "Could not create a new user!" });
        // }
      } else {
        console.log(`Created new user ${username} successfully!`);
        return res
          .status(201)
          .json({ message: `Created new user ${username} successfully!` });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Username and/or Password are missing!" });
    }
  } catch (err) {
    console.log("Here error ", err);
    return res
      .status(500)
      .json({ message: "Database failure when creating new user!" });
  }
}

export async function signIn(req, res) {
  try {
    const { username, password } = req.body;
    if (username && password) {
      const user = await _getUser(username, password);
      if (user.err) {
        return res.status(400).json({ message: "Could not sign in!" });
      } else {
        console.log(`Signed in user ${username} successfully!`);

        let token = await generateToken(user);

        return res.status(201).json({
          username: username,
          token: token,
        });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Username and/or Password are missing!" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Could not found user" });
  }
}

export async function generateToken(user) {
  let privateKey = process.env.JWT_PRIVATE_KEY;

  let token = await jwt.sign(
    {
      username: user.username,
    },
    privateKey,
    { expiresIn: "3h" }
  );
  console.log(token);
  return token;
}
