import { any } from 'joi';
import mongoose, { Schema, Document } from 'mongoose'

interface User extends Document {
  first: string
  last: string
  username: string
  role: string
  jobTitle: string
  phone: string
  email: string
  password: string
  img: {
    data: any;
    contentType: string;
  };
  resetToken: string | undefined
  expireToken: number | undefined
}

const UserSchema: Schema = new Schema({
  first: { type: String, required: true },
  last: { type: String, required: true },
  username: { type: String, required: true },
  role: { type: String, required: true },
  jobTitle: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  // blob saved
  img: {
    data: Buffer,
    contentType: String,
  },
  resetToken: { type: String, required: false },
  expireToken: { type: Number, required: false },
})

export const User = mongoose.model<User>('User', UserSchema)