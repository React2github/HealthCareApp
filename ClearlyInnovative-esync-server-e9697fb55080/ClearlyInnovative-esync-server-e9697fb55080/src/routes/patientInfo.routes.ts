import asyncHandler from "express-async-handler";
import Router from "express";
import { patientInfo } from "../models/patientInfo";
import path from "path";
import fs from "fs";
import multer from "multer";

const upload = multer({ dest: "uploads/" });
export const patientInfoRouter = Router();

// find many
patientInfoRouter.get(
  "/",
  asyncHandler(async (request, response) => {
    try {
      const foundPosts = await patientInfo
        .find()
        .populate({ path: "progressNotes", select: "createdAt updatedAt" });
      console.log("Patients", foundPosts);
      response.json(foundPosts);
    } catch (e) {
      console.log("ERROR", e);
      return response.status(400).json(e);
    }
  })
);

// find one
patientInfoRouter.get(
  "/:id",
  asyncHandler(async (request, response) => {
    try {
      const foundPost = await patientInfo
        .findOne({ _id: request.params.id })
        .populate({ path: "progressNotes" });
      response.json(foundPost);
    } catch (e) {
      console.log("ERROR", e);
      return response.status(400).json(e);
    }
  })
);

// create one
patientInfoRouter.post(
  "/",
  upload.single("image"),
  asyncHandler(async (request, response) => {
    try {
      // check if i have a file to upload
      const hasImage =
        request?.body.image !== null && request?.body.image !== "undefined";

      // if i have a file then get the path
      const filePath = hasImage
        ? path.join("uploads/" + request?.file?.filename)
        : null;

      const data = {
        ...request.body,
        img: hasImage
          ? {
              data: fs.readFileSync(filePath as any),
              contentType: "image/png",
            }
          : null,
      };
      debugger
      console.log("data", data);

      // came in with body
      delete data["image"];

      const createdPost = await patientInfo.create(new patientInfo(data));
      response.json(createdPost);
    } catch (e) {
      console.log("ERROR", e);
      return response.status(400).json(e);
    }
  })
);

// update one
patientInfoRouter.patch(
  "/:id",
  asyncHandler(async (request, response) => {
    try {
      const updatedPost = await patientInfo.findOneAndUpdate(
        { _id: request.params.id },
        { $set: request.body },
        { new: true } as any
      );
      response.json(updatedPost);
    } catch (e) {
      console.log("ERROR", e);
      return response.status(400).json(e);
    }
  })
);

// delete one
patientInfoRouter.delete(
  "/:id",
  asyncHandler(async (request, response) => {
    try {
      const deletedPost = await patientInfo.findByIdAndDelete(
        request.params.id
      );
      response.json(deletedPost);
    } catch (e) {
      console.log("ERROR", e);
      return response.status(400).json(e);
    }
  })
);

