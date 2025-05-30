import { request } from "express";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name : {type : String, required: true},
        username : {type: String, required: true},
        password : {type: String, required: true, unique: true},
        token : {type: String},

    }
)

const User = mongoose.model("User", userSchema);

export {User};