import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  tipo: { type: String, required: true },
  id_escola: { type: Number }
})

export const UserModel = mongoose.model('User', UserSchema)