import express from "express";
import { registerUser,authUser, allUsers } from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";

// mini app
const router = express.Router();


router.route('/').post(registerUser).get(protect,allUsers);
router.post('/login', authUser);

export {router};