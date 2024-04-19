import express from "express";
import { chats } from "./Data/data.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import {router as userRoutes} from "./routes/userRoutes.js"
import {router as chatRoutes} from "./routes/chatRoutes.js"
import {router as messageRoutes} from "./routes/messageRoutes.js"
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import {createServer} from "http";
import {Server} from "socket.io";

const app = express();
dotenv.config();
app.use(express.json());
connectDB();
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors : {
        origin : "*"
    }
});

app.get("/", (req,res) => {
    res.send("A")
})

app.use('/api/user',userRoutes)

app.use("/api/chat",chatRoutes)

app.use("/api/message",messageRoutes);

app.use(notFound);
app.use(errorHandler);

io.on("connection",(socket) => {
    console.log("Connected to socket.io");

    socket.on("setup",(userData) => {
        // join the room
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit("connected");
    })

    socket.on("join chat",(room)=>{
        socket.join(room);
        console.log("User joined room" + room);
    })

    socket.on("typing", (room) => {
        socket.in(room).emit("typing");
    })

    socket.on("stop typing", (room) => {
        socket.in(room).emit("stop typing");
    })

    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
    
        if (!chat.users) return console.log("chat.users not defined");
    
        chat.users.forEach((user) => {
          if (user._id == newMessageRecieved.sender._id) return;
    
          socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
      });

      socket.off("setup",() => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
      })
})

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT,()=>{
    console.log("Server started at",PORT);
})

