import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
})

export const userModel = mongoose.model('user', userSchema);