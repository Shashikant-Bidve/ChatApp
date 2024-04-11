import asyncHandler from "express-async-handler";
import {User} from "../models/userModel.js";
import { generateToken } from "../config/generateToken.js";

const registerUser = asyncHandler(async (req,res) => {
    const {name, email, password, pic} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please enter all the fields.")
    }

    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error("User already exists.")
    }

    const newUser = await User.create({
        name,
        email,
        password,
        pic,
    })

    if(newUser){
        res.status(201).json({
            _id : newUser._id,
            name:newUser.name,
            email:newUser.email,
            pic:newUser.pic,
            token: generateToken(newUser._id)
        }); 
    }else{
        res.status(400);
        throw new Error("User was not created.")
    }
});


const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const newUser = await User.findOne({email});

    if(newUser && (await newUser.matchPassword(password))){
        res.status(201).json({
            _id : newUser._id,
            name:newUser.name,
            email:newUser.email,
            pic:newUser.pic,
            token: generateToken(newUser._id)
        }); 
    }
});

export {registerUser, authUser};