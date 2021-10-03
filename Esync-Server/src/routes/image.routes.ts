// file upload config
// Step 5 - set up multer for storing uploaded files
import asyncHandler from "express-async-handler";
import Router from "express";
import multer from "multer";
import { Image } from "../models/image";
import path from "path";
import fs from "fs";

const upload = multer({ dest: "uploads/" });
export const imageRouter = Router();

// find many
imageRouter.get(
  "/",
  asyncHandler(async (request, response) => {
    const foundImages = await Image.find();
    console.log(foundImages);
    response.json(foundImages);
  })
);

// delete image
imageRouter.delete(
    "/:id",
    asyncHandler(async (request, response) => {
      const deletedImage = await Image.findByIdAndDelete(request.params.id);
      response.json(deletedImage);
    })
  );

// find one image
imageRouter.get(
    "/:id",
    asyncHandler(async (request, response) => {
      const foundImage = await Image.findOne({ _id: request.params.id });
      response.json(foundImage);
    })
  );

// add/upload image
imageRouter.post(
  "/",
  upload.single("image"),
  asyncHandler(async (request: any, response: any) => {
    console.log("file", request.file);
    console.log(request.body);

    const filePath = path.join("uploads/" + request.file.filename);
    var imageBody = {
      name: request.body.name,
      description: request.body.description,
      img: {
        data: fs.readFileSync(filePath),
        contentType: "image/png",
      },
    };

    // removed
    const createdImage = Image.create(new Image(imageBody));

    fs.unlink(filePath, (x: any) => {
      console.log("error", x);
    });

    response.json(createdImage);
  })
);
