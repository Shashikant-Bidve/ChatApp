import express from "express";
import { chats } from "./Data/data.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import {router as userRoutes} from "./routes/userRoutes.js"
import {router as chatRoutes} from "./routes/chatRoutes.js"
import { errorHandler, notFound } from "./middleware/errorHandler.js";

const app = express();
dotenv.config();
app.use(express.json());
connectDB();

app.get("/", (req,res) => {
    res.send("A")
})

app.use('/api/user',userRoutes)

app.use("/api/chat",chatRoutes)

app.get("/api/chat/:id",(req,res)=>{
    res.send(chats.filter((e)=>{
        return e._id == req.params.id;
    }))
})

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log("Server started at",PORT);
})