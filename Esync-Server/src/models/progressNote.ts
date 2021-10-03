import mongoose, { Schema, Document } from "mongoose";

interface progressNote extends Document {
  // Activities

  activities: any;

  // Health and Wellness

  medications: Boolean;
  notes: String;
  sideEffects: Boolean;
  adaptiveEquipment: Boolean;
  notes2: String;
  needsRepairs: Boolean;
  seizures: Boolean;
  exercise: Boolean;
  notes3: String;

  // Meals and Fluids

  protein: Number;
  fruit: Number;
  grains: Number;
  vegetables: Number;
  water: Number;
  juices: Number;

  otherFluidAmount: Number;
  otherFluidDescription: String;

  otherMealAmount: Number;
  otherMealDescription: String;

  // Additional Questions

  one: String;
  two: String;
  three: String;
  four: String;
  five: String;
  six: String;
  seven: String;
  eight: String;

  patientId: String;
}

const progressNoteSchema: Schema = new Schema(
  {
    // Activities Schema

    activities: { type: Array, required: true },

    // Health and Wellness Schema
    health_wellness: {
      medications: { type: Boolean, required: true },
      equipment: { type: Boolean, required: true },
      equipment_notes: { type: String, required: true },
      sideEffects: { type: Boolean, required: true },
      exercise_notes: { type: String, required: true },
      equipment_needs_repair: { type: Boolean, required: true },
      seizure: { type: Boolean, required: true },
      exercise: { type: Boolean, required: true },
      sideEffects_notes: { type: String, required: true },
    },

    // Meals and Fluids Schema

    protein: { type: Number, required: true },
    fruit: { type: Number, required: true },
    otherFluidAmount: { type: Number, required: true },
    otherFluidDescription: { type: String, required: true },
    grains: { type: Number, required: true },
    vegetables: { type: Number, required: true },
    water: { type: String, required: true },
    otherMealAmount: { type: Number, required: true },
    otherMealDescription: { type: String, required: true },
    juices: { type: Number, required: true },

    // Additional Questions Schema

    one: { type: String, required: true },
    two: { type: String, required: true },
    three: { type: String, required: true },
    four: { type: String, required: true },
    five: { type: String, required: true },
    six: { type: String, required: true },
    seven: { type: String, required: true },
    eight: { type: String, required: true },

    patientId: {
      type: Schema.Types.ObjectId,
      ref: "patientInfo",
      required: true,
    },
  },
  { timestamps: true }
);

mongoose.Schema.Types.Boolean.convertToTrue.add("on");
mongoose.Schema.Types.Boolean.convertToFalse.add("off");
export const progressNote = mongoose.model<progressNote>(
  "progressNote",
  progressNoteSchema
);
