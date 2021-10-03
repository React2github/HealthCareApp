import mongoose, { Schema, Document } from "mongoose";

interface Image extends Document {
  name: string;
  description: string;
  img: {
    data: any;
    contentType: string;
  };
  userId : string | undefined
}

const imageSchema = new Schema({
  name: String,
  description: String,
  img: {
    data: Buffer,
    contentType: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
});

//Image is a model which has a schema imageSchema

export const Image = mongoose.model<Image>("image", imageSchema);
