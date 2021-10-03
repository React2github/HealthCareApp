import { number } from 'joi'
import mongoose, { Schema, Document } from 'mongoose'

interface Location extends Document {
  name: string
  description: string
  street_address_1: string
  street_address_2: string
  city: string
  state: string
  zip: string
  // lat, lng
  coordinates: [number, number]
  date: Date
}

const LocationSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  street_address_1: { type: String, required: true },
  street_address_2: { type: String, required: false },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  // lat, lng
  coordinates: { type: [Number, Number], required: false },
  date: { type: Date, default: Date.now },
})

export const Location = mongoose.model<Location>('Location', LocationSchema)