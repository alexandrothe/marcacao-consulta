import express, { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/Usuario";
import { TipoUsuario } from "../entity/TipoUsuario";
import { EntityNotFoundError } from "typeorm";
import {ResponseError} from "../middlewares/errorHandler";

const userRouter = express.Router();

interface CreateUserInterface {
    nome: string
    idade?: number
    senha?: string
    tipoUsuarioId: number
}

userRouter.post('/', async(req: Request, res: Response, next: NextFunction) => {

    try{
        const userId = req.body.userId;

        if( !userId){
            const noIdReceived =  new ResponseError();
            noIdReceived.message = 'Id Can not Be Null';
            noIdReceived.status = 404;

            throw  noIdReceived;
        }

        const userExist = await AppDataSource.manager.findOneOrFail(Usuario, {
            where: {
                id: userId
            },
            relations: {
                tipoUsuario:true
            }
        });

        res.json({ok: true, user: userExist})
    }
    catch(err){
        next(err);
    }

});

userRouter.post('/signup', async (req: Request, res: Response, next:NextFunction) => {

    try{
        const {nome, idade, senha, tipoUsuarioId} = <CreateUserInterface>req.body;
        
        const tipoUsuario = await AppDataSource.manager.findOneByOrFail(TipoUsuario, { id: tipoUsuarioId});


        const newUser = new Usuario();
        newUser.nome = nome;
        newUser.tipoUsuario = tipoUsuario;
    
        await AppDataSource.manager.save(Usuario, newUser);

        res.status(202).json({ok: true, message: 'User created'});
    }
    catch(err) {
        const error = new ResponseError();
        
        if (err instanceof EntityNotFoundError) {

            res.status(404).json({message: err});
            error.message = "Tipo de usuario não encontrado";
            error.status = 404
            next(error);
        }
        else{
            next(error);

        }
    }
});

export default userRouter;