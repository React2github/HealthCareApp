import { patientInfo } from "./../models/patientInfo";
import asyncHandler from "express-async-handler";
import Router from "express";
import { progressNote } from "../models/progressNote";

export const progressNoteRouter = Router();

/**
 * add a new progress note and associate it with a specific patient
 */
progressNoteRouter.post(
  "/",
  asyncHandler(async (request, response) => {
    try {
      // create the note..
      const createdprogressNote = await progressNote.create(
        new progressNote(request.body)
      );
      await createdprogressNote.save();

      response.json(createdprogressNote);
    } catch (e) {
      console.log("ERROR", e);
      return response.status(400).json(e);
    }
  })
);

// find many
progressNoteRouter.get(
  "/",
  asyncHandler(async (request, response) => {
    try {
      const foundPosts = await progressNote.find();
      console.log("Patients", foundPosts);
      response.json(foundPosts);
    } catch (e) {
      console.log("ERROR", e);
      return response.status(400).json(e);
    }
  })
);

// find many by patientid
progressNoteRouter.get(
  "/patient/:id",
  asyncHandler(async (request, response) => {
    try {
      const foundPosts = await progressNote.find({
        patientId: request.params.id,
      });
      console.log("progressNotes", foundPosts);
      response.json(foundPosts);
    } catch (e) {
      console.log("ERROR", e);
      return response.status(400).json(e);
    }
  })
);

// find one
progressNoteRouter.get(
  "/:id",
  asyncHandler(async (request, response) => {
    try {
      const foundPost = await progressNote.findOne({ _id: request.params.id });
      response.json(foundPost);
    } catch (e) {
      console.log("ERROR", e);
      return response.status(400).json(e);
    }
  })
);

// create one
// progressNoteRouter.post(
//   "/",
//   asyncHandler(async (request, response) => {
//     const createdPost = await progressNote.create(
//       new progressNote(request.body)
//     );
//     response.json(createdPost);
//   })
// );

// update one
progressNoteRouter.patch(
  "/:id",
  asyncHandler(async (request, response) => {
    try {
      const updatedPost = await progressNote.findOneAndUpdate(
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
progressNoteRouter.delete(
  "/:id",
  asyncHandler(async (request, response) => {
    try {
      const deletedPost = await progressNote.findByIdAndDelete(
        request.params.id
      );
      response.json(deletedPost);
    } catch (e) {
      console.log("ERROR", e);
      return response.status(400).json(e);
    }
  })
);
