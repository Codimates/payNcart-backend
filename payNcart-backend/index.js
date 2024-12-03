import express from "express"
import { connectDB } from "./config/db.js"
import 'dotenv/config'
import orderRouter from "./routes/orderRoute.js"
import cartRouter from "./routes/cartRoute.js"
import cors from 'cors';

// app config
const app = express()
const port = 4006

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// cors configuration
app.use(cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
}));
// db connection
connectDB()

// api endpoints
app.use("/api/order",orderRouter)
app.use("/api/cart",cartRouter)


// preview a message in the path of backend url
app.get("/",(req,res)=>{
    res.send("Backend is running !")
})

// start the server
app.listen(port,()=>{
    console.log(`Server is running on ${port} !`)
})

