import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';

let app = express();

mongoose.connect("mongodb+srv://admin:123@cluster0.vqauv02.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(
    ()=>{
        console.log("connected to the database");
    }
).catch(
    ()=>{
        console.log("connection failed");
    }
)


app.use (bodyParser.json());



app.use("/api/user",userRouter);



app.listen(5000,()=>
    {
        console.log("server is runnig on port 5000");
    }
)