import { imageRouter } from "./routes/image.routes";

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
const uuid = require("uuid").v4;

import { usersRouter } from "./routes/user.routes";
import { authRouter } from "./routes/auth.routes";

import { progressNoteRouter } from "./routes/progressNote.routes";
import { patientInfoRouter } from "./routes/patientInfo.routes";
import { auth } from "./validation/token";
import path from "path";
import { locationsRouter } from "./routes/location.routes";
import { appointmentsRouter} from "./routes/appointments.routes"

const express_session = require("express-session");
const FileStore = require("session-file-store")(express_session);

dotenv.config();
const app: express.Application = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set up sessions
const sessionStore = new FileStore();
const session = express_session({
  genid: (req: any) => {
    console.log("Inside the session middleware");
    console.log('req.sessionID',req.sessionID);
    return uuid(); // use UUIDs for session IDs
  },
  store: sessionStore,
  secret: "test secret", //process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  secure: process.env.NODE_ENV === "production",
});
app.use(session);

app.use( (req: any, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // add this line
  console.log("req.session", req.session);
  next();
});

app.use("/api/auth", authRouter);
app.use("/api/users", auth, usersRouter);
app.use("/api/images", auth, imageRouter);
app.use("/api/patients", auth, patientInfoRouter);
app.use("/api/progressNotes", auth, progressNoteRouter);
app.use("/api/locations", auth, locationsRouter);
app.use("/api/appointments", auth, appointmentsRouter);
app.get("/", (request, response) => response.send("we are on home"));

console.log(
  "MONGO_DNS_SEED_LIST_CONNECTION",
  process.env.MONGO_DNS_SEED_LIST_CONNECTION
);

mongoose.connect(
  process.env.MONGO_DNS_SEED_LIST_CONNECTION ||
    "mongodb://localhost:27017/blog",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  (err: any) =>
    err
      ? console.log("Error mongodb database ", err)
      : console.log("connected to mongodb database")
);
app.listen(port, () => console.log(`listening at http://localhost:${port}`));
