import express from "express";
import { userDelete, loginUser, userSingUp, userUpdate } from "../controller/usuario.controller";


export const userRouter = express.Router();


userRouter.post('/login', loginUser);
userRouter.post('/create', userSingUp );

userRouter.put('/update/:userId', userUpdate );
userRouter.delete('/delete/:userId', userDelete);
