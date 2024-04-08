import express from "express";
import { chats } from "./Data/data.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.get("/", (req,res) => {
    res.send("A")
})

app.get("/api/chat",(req,res)=>{
    res.send(chats)
})

app.get("/api/chat/:id",(req,res)=>{
    res.send(chats.filter((e)=>{
        return e._id == req.params.id;
    }))
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log("Server started at",PORT);
})