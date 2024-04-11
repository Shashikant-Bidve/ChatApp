import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { accessChat, createGroupChat, fetchChats } from "../controllers/chatController.js";

const router = express.Router();


router.route('/').post(protect,accessChat);
router.route('/').get(protect,fetchChats);
router.route('/group').get(protect,createGroupChat);
// router.route('/rename').put(protect,renameGroup);
// router.route('/groupremove').put(protect,removeGroup);
// router.route('/groupadd').put(protect,addGroup);
export {router};