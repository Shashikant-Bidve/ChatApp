import express from "express";
import { registerUser,authUser } from "../controllers/userControllers.js";

// mini app
const router = express.Router();


router.route('/').post(registerUser);

router.post('/login', authUser);

export {router};