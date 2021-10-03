import asyncHandler from "express-async-handler";
import Router, { response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { registerValidation, loginValidation } from "../validation/schemas";
import path from "path";
import fs from "fs";
import multer from "multer";
import { string } from "joi";

const nodemailer = require("nodemailer");

const upload = multer({ dest: "uploads/" });
export const authRouter = Router();

// Function for token reset

/**
 *
 */
const forgotPasswordTokenGenerator = async (email: string) => {
  let user = await User.findOne({ email });
  if (!user) {
    throw new Error("user doesn't exist with that email address");
  }

  const crypto = require("crypto");
  const token = crypto.randomBytes(32).toString("hex");

  const updates = {
    resetToken: token,
    expireToken: Date.now() + 3600000,
  };
  // returns updated user with tokens
  const updatedUser = await User.findOneAndUpdate(
    { email },
    { $set: updates },
    { returnOriginal: false }
  );
  return updatedUser;
};

authRouter.post(
  "/register",
  upload.single("image"),
  asyncHandler(async (request, response) => {
    const { image, ...bodyNoImage } = request.body;
    // validate user fields
    const { error } = registerValidation(bodyNoImage);
    console.log(error);

    if (error)
      return response.status(400).json({ message: error.details[0].message });

    // check if email already exists
    const emailExists = await User.findOne({ email: request.body.email });
    if (emailExists)
      return response.status(400).json({ message: "email already exists" });

    // check if i have a file to upload
    const hasImage =
      request?.body.image !== null && request?.body.image !== "undefined";
    // if i have a file then get the path
    const filePath = hasImage
      ? path.join("uploads/" + request?.file?.filename)
      : null;

    // hash password
    const saltRounds = 10;
    const hash = bcrypt.hashSync(request.body.password, saltRounds);

    // create user
    const createdUser = await User.create({
      username: request.body.username,
      role: request.body.role,
      email: request.body.email,
      first: request.body.first,
      last: request.body.last,
      jobTitle: request.body.jobTitle,
      phone: request.body.phone,
      img: hasImage
        ? {
            data: fs.readFileSync(filePath as any),
            contentType: "image/png",
          }
        : null,
      password: hash,
    });

    console.log("created user", createdUser);

    // session token
    const sessionToken = jwt.sign(
      { id: createdUser.id },
      process.env.JWT_SECRET || "secret"
    );

    // get new user object with reset password tokens
    const user = await forgotPasswordTokenGenerator(request.body.email);
    console.log("token user", user);

    response.json({ user: user, token: sessionToken });
  })
);

/**
 *
 */
authRouter.post(
  "/login",
  asyncHandler(async (request, response) => {
    // validate user fields
    const { error } = loginValidation(request.body);
    if (error)
      return response.status(400).json({ message: error.details[0].message });

    // check if email already exists
    const foundUser = await User.findOne({
      email: request.body.email,
    });
    console.log(foundUser);

    if (!foundUser)
      return response
        .status(400)
        .json({ message: "email is not registered yet" });

    // check password
    const validPassword = bcrypt.compareSync(
      request.body.password,
      foundUser.password
    );
    if (!validPassword)
      return response.status(400).json({ message: "password is not correct" });

    // create and assign a json web token
    const token = jwt.sign(
      { id: foundUser._id },
      process.env.JWT_SECRET || "secret"
    );
    const user: any = {
      email: foundUser.email,
      first: foundUser.first,
      last: foundUser.last,
      jobTitle: foundUser.jobTitle,
      phone: foundUser.phone,
      username: foundUser.username,
      id: foundUser._id,
      role: foundUser.role,
      img: foundUser.img,
    };
    (request as any).session.userInfo = { userId: user.id, token };
    console.log("session info", (request as any).session);

    response.header("auth-token", token).json({ user, token });
  })
);

authRouter.post(
  "/logout",
  asyncHandler(async (request, response) => {
    // sessionStore.destroy(req.sessionID);
    (request as any).session.destroy();
    response.clearCookie("connect.sid");
    return response.status(200).json({ message: "logout success" });
  })
);

authRouter.get(
  "/authCheck",
  asyncHandler(async (request, response) => {
    console.log("sessionID", (request as any).sessionID);
    console.log("authcheck: ", (request as any)?.session?.userInfo);
    return response.json({ session: (request as any)?.session?.userInfo });
  })
);

// https://blog.mega-coding.com/reset-password-with-nodejs-and-nodemailer
/**
 * called to update the users password
 */
authRouter.post(
  "/resetPassword",
  asyncHandler(async (request, response) => {
    const newPassword = request.body.password;
    const sentToken = request.body.token;
    console.log("request.body", JSON.stringify(request.body))
    const user = await User.findOne({
      email: request.body.email,
      resetToken: sentToken,
      expireToken: { $gt: Date.now() },
    });
    if (!user) {
      throw new Error("Try again session expired" );
    }

    // hash password
    const saltRounds = 10;
    const hash = bcrypt.hashSync(newPassword, saltRounds);

    user.password = hash;
    user.resetToken = undefined;
    user.expireToken = undefined;
    await user.save();
    response.json( {message: "password updated success" })
  })
);

/**
 * called to send an email to the user to change the password
 */
authRouter.post(
  "/requestPasswordChange",
  asyncHandler(async (request, response) => {
    const token = forgotPasswordTokenGenerator(request.body.email);
    response.json({ token });
  })
);

// authRouter.post(
//   "/createNewUser",
//   upload.single("image"),
//   asyncHandler(async (request, response) => {
//     const { image, ...bodyNoImage } = request.body;
//     // validate user fields
//     const { error } = registerValidation(bodyNoImage);
//     console.log(error);

//     if (error)
//       return response.status(400).json({ message: error.details[0].message });

//     // check if email already exists
//     const emailExists = await User.findOne({ email: request.body.email });
//     if (emailExists)
//       return response.status(400).json({ message: "email already exists" });

//     // check if i have a file to upload
//     const hasImage =
//       request?.body.image !== null && request?.body.image !== "undefined";
//     // if i have a file then get the path
//     const filePath = hasImage
//       ? path.join("uploads/" + request?.file?.filename)
//       : null;

//     // hash password
//     const saltRounds = 10;
//     const hash = bcrypt.hashSync(request.body.password, saltRounds);

//     const createdUser = await User.create({
//       username: request.body.username,
//       role: request.body.role,
//       email: request.body.email,
//       first: request.body.first,
//       last: request.body.last,
//       jobTitle: request.body.jobTitle,
//       phone: request.body.phone,
//       img: hasImage
//         ? {
//             data: fs.readFileSync(filePath as any),
//             contentType: "image/png",
//           }
//         : null,
//       password: hash,
//     });

//     console.log(createdUser);
//     const token = jwt.sign(
//       { id: createdUser.id },
//       process.env.JWT_SECRET || "secret"
//     );
//     forgotPasswordTokenGenerator(request.body.email)
//     response.json({ user: createdUser, token });

//     const token2 = forgotPasswordTokenGenerator(request.body.email);
//     response.json({ token2 });

//   })

// )
