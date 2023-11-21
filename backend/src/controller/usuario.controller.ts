import { Request, Response, NextFunction } from "express";
import { ResponseError } from "../middlewares/errorHandler";
import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/Usuario";
import { TipoUsuario } from "../entity/TipoUsuario";


interface UserInterface {
    nome: string
    idade?: number
    senha?: string
    tipoUsuario: number
}


export const getUser = async (req: Request, res: Response, next: NextFunction) => {

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
}

export const userSingUp = async (req: Request, res: Response, next:NextFunction) => {

    try{
        const {nome, idade, senha, tipoUsuario} = <UserInterface>req.body;
        
        // get the user type from tipoUsuario
        const typeOfUser = await AppDataSource.manager
            .getRepository(TipoUsuario)
            .createQueryBuilder('tipo_usuario')
            .where('id = :id ', {id: tipoUsuario})
            .getOne()

        // if the tipoUsuari was not found, it wil create a responseError() and throw to the catch block
        if(typeOfUser == null){
            const error = new ResponseError();
            error.message = 'Tipo usuario não encontrado';
            error.status = 404

            throw error;
        }
        
        const user = await AppDataSource
            .createQueryBuilder()
            .insert()
            .into(Usuario)
            .values([{
                nome: nome, tipoUsuario: typeOfUser
            }])
            .execute()


        res.status(202).json({ok: true, message: 'User created'});
    }
    catch(err) {
        next(err);
    }
}


export const userUpdate = async (req: Request, resp: Response, next: NextFunction ) => {
    try{
        
        const targetId = req.params.id;

        await AppDataSource
            .createQueryBuilder()
            .update(Usuario)
            .set({ ...req.body  })
            .where("id = :id",{ id: targetId})
            .execute();


        resp.json({ok:true, message: 'user updated' });


    }
    catch(err){
        next(err);
    }
}

export const userDelete = async (req: Request, resp: Response, next: NextFunction) => {
    
    try{
        const userIdToDelete = req.params.id;
        
        const userDeleted = await AppDataSource
            .createQueryBuilder()
            .delete()
            .from(Usuario)
            .where('id = :id', { id: userIdToDelete })
            .execute();

        resp.status(202).json({ok: true, message: 'user deleted'});

    }
    catch(err){
        next();
    }

}