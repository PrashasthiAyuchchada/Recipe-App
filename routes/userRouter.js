import express from "express";
import { saveUSer } from "../controllers/userController.js";


const userRouter = express.Router();

userRouter.post("/",saveUSer)

export default userRouter;