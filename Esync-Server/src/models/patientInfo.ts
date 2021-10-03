import { progressNote } from './progressNote';
import mongoose, { Schema, Document } from "mongoose";

interface patientInfo extends Document {
  name: string;
  date: Date;
  staffName: any;
  locations: any;
  signature: string;
  managerReview: string;
  medicaidId: string;
  pa: string;
  service: string;
  dob: Date;
  img: {
    data: any;
    contentType: string;
  };
  demoInfoForm: {
  contact: {
    address: string,
    name: string,
    phone: string,
    relationship: string,
    type: string
    },
  provider: {
    name: string,
    speciality: string,
    phone: string,
    address: string,
    },
  demoForm: {
    name: string,
    Medicaid: string,
    age: string,
    birthplace: string,
    birthdate: string,
    date: string,
    guardian: string, 
    maidenName: string, 
    medicare: string,
    medicareID: string,
    number: string,
    preferredName: string,
    provider: string,
    security: string,
    sex: string,
    sideEffects: string,
    },
  }
}

const patientInfoSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    date: {type: Date, required: true},
    staffName: { type: Array, required: true },
    locations: { type: Array, required: true },
    signature: { type: String, required: true },
    managerReview: { type: String, required: true },
    medicaidId: { type: String, required: true },
    pa: { type: String, required: true },
    service: { type: String, required: true },
    dob: { type: Date, required: true },
    img: {
      data: Buffer,
      contentType: String,
    },
    demoInfoForm: {
    contact: {
      address: { type: String, required: true},
      name: { type: String, required: true},
      phone: { type: String, required: true},
      relationship: { type: String, required: true},
      type: {type: String, required: true}
   },
   provider: {
    address: { type: String, required: true},
    name: { type: String, required: true},
    phone: { type: String, required: true},
    speciality: { type: String, required: true},
 },
 demoForm: {
  name: { type: String, required: true},
  Medicaid: {type: String, required: true},
  age: { type: String, required: true},
  birthplace: { type: String, required: true},
  birthdate: { type: String, required: true},
  date: {type: String, required: true},
  guardian: {type: String, required: true}, 
  maidenName: {type: String, required: true}, 
  medicare: {type: String, required: true},
  medicareID: {type: String, required: true},
  number: {type: String, required: true},
  preferredName: {type: String, required: true},
  provider: {type: String, required: true},
  security: {type: String, required: true},
  sex: {type: String, required: true},
  sideEffects: {type: String, required: true},
},
    },
  },
  { timestamps: true }
);


patientInfoSchema.virtual('progressNotes', {
  ref: 'progressNote', //The Model to use
  localField: '_id', //Find in Model, where localField 
  foreignField: 'patientId', // is equal to foreignField
});

// Set Object and Json property to true. Default is set to false
patientInfoSchema.set('toObject', { virtuals: true });
patientInfoSchema.set('toJSON', { virtuals: true });


export const patientInfo = mongoose.model<patientInfo>(
  "patientInfo",
  patientInfoSchema
);
