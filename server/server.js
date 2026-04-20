import "./patch.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import http from "http"
import cors from "cors"

// importing routes
import auth_router from "./routes/auth_routes.js";
import user_router from "./routes/user_routes.js";
import event_router from "./routes/event_routes.js"
import business_router from "./routes/business_routes.js";
import resouce_router from "./routes/resource_routes.js";
import job_router from "./routes/job_routes.js"
import message_router from "./routes/message_routes.js"
import { SetUpSocket } from "./socket.js";


dotenv.config();
const PORT = process.env.PORT || 8001;
const MONGODB_URL = process.env.MONGODB_URL ;
const app = express();
const server = http.createServer(app);


// middlewares
const allowedOrigins = [
    "https://women-entrepreneur-hub-q9ox.vercel.app",
    "http://localhost:5173",
    process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"]
}));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));


// routes
app.use('/api/auth' , auth_router);
app.use('/api/user' , user_router);
app.use('/api/event',event_router);
app.use('/api/business' , business_router);
app.use('/api/resource' , resouce_router);
app.use('/api/job' ,job_router );
app.use("/api/message",message_router)



// server & mongodb
server.listen(PORT , () => {
    console.log(`server is running on the PORT ${PORT}`)
});

SetUpSocket(server);

mongoose.connect(MONGODB_URL,{
    // connectTimeoutMS: 30000
})
.then(() => console.log("MongoDB is connected"))
.catch((error) => console.log("MongoDB connection failed"))





