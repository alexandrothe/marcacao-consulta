
import { AppDataSource } from "./data-source";
import express, { Request, Response, NextFunction} from "express"
import {notFoundErrorHandler, asyncErrorHandler } from './middlewares/errorHandler';
import userRouter from "./routes/user.router";

AppDataSource.initialize()
.then(async () => {
   console.log('AppDatasource has been initialized')
})
.catch(error => console.log(error));

const app = express();


// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// ROUTES
app.use('/api/user', userRouter);


// ERROR HANDLER
app.use(notFoundErrorHandler);
app.use(asyncErrorHandler);


app.listen(4000)