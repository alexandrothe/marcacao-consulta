import express from "express";
import { userDelete, loginUser, userSingUp, userUpdate } from "../controller/usuario.controller";
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage});

export const userRouter = express.Router();


userRouter.post('/login', loginUser);
userRouter.post('/create', userSingUp );

userRouter.put('/update/:userId', userUpdate );
userRouter.delete('/delete/:userId', userDelete);
