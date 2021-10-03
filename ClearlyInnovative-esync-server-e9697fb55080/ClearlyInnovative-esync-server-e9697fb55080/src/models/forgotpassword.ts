import mongoose, { Schema, Document } from 'mongoose'

interface Forgotpassword extends Document {
// Space for model 
}

const PasswordSchema: Schema = new Schema({
// Space for Schema

});

export const Forgotpassword = mongoose.model<Forgotpassword>('Forgotpassword', PasswordSchema)