import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  nome: String,
  email: { type: String, unique: true },
  password: String,
  tipo: String,
  id_escola: Number,
})

export const UserModel = mongoose.model("User", userSchema)