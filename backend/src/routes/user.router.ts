import express from "express";
import { userDelete, getUser, userSingUp, userUpdate } from "../controller/user.controller";


const userRouter = express.Router();


userRouter.post('/', getUser);
userRouter.post('/signup', userSingUp );
userRouter.put('/update/:id', userUpdate );
userRouter.delete('/delete/:id', userDelete);


export default userRouter;