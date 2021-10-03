import { number, object } from 'joi'
import mongoose, { Schema, Document } from 'mongoose'

interface Appointments extends Document {
  location: any,
  DSP: any,
  date: string,
  start_time: string,
  end_time: string,
}

const AppointmentsSchema: Schema = new Schema({
  location: { type: Object, required: true },
  DSP: { type: Object, required: true },
  date: { type: String, required: true },
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },

})

export const Appointments = mongoose.model<Appointments>('Appointments', AppointmentsSchema)