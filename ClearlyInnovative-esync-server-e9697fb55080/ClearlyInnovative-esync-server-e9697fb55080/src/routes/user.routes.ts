import asyncHandler from "express-async-handler";
import Router from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/user";
import { registerValidation, loginValidation } from "../validation/schemas";

export const usersRouter = Router();

// find many
usersRouter.get(
  "/",
  asyncHandler(async (request, response) => {
    const foundPosts = await User.find();
    console.log(foundPosts);
    response.json(foundPosts);
  })
);

usersRouter.get(
  "/:id",
  asyncHandler(async (request, response) => {
    const user = await User.findOne({ _id: request.params.id });
    console.log(user);
    
    if (user) return response.json(user);
    return response.status(400).json({ message: "user not found" });
  })
);


// create one
usersRouter.post('/', asyncHandler(async (request, response) => {
  const createdUsers = await User.create(new User(request.body))
  response.json(createdUsers)
}))

// update one
usersRouter.patch('/:id', asyncHandler(async (request, response) => {
  const updatedusers = await User.findOneAndUpdate({ _id: request.params.id }, { $set: request.body })
  response.json(updatedusers)
}))


