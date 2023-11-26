import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/Usuario";


const usuarioRepo = AppDataSource.getRepository(Usuario);

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const { cardNumber, password }= <Usuario>req.body;

        const user  = await usuarioRepo.findOne({
            where:{
                password: password,
                cardNumber: cardNumber
            }
        });
    
        if(!user){
            res.json({
                ok: false,
                message: "User was not found"
            });
        }
        else{
            res.json({ok: true, user: user});
        }
    }
    catch(err){
        next(err);
    }
}

export const userSingUp = async (req: Request, res: Response, next:NextFunction) => {

    try{
        const {name, password, birthDay,cardNumber, sex} = <Usuario>req.body;


        const user = new Usuario();
        user.cardNumber = cardNumber;
        user.birthDay = birthDay;
        user.password = password;
        user.sex = sex;
        user.name = name;

        await usuarioRepo.save(user);

        res.status(202).json({ok: true, message: 'User created'});
    }
    catch(err) {
        next(err);
    }
}


export const userUpdate = async (req: Request, res: Response, next: NextFunction ) => {
    try{
        
        const { userId } = req.params;


        const user = await usuarioRepo.findOne({
            where:{
                id: parseInt(userId)
            }
        });

        if(!user){
            res.status(404).json({
                ok:false,
                message: "User not found"
            });
        }

        await usuarioRepo.update(
            { id: user.id,cardNumber: user.cardNumber }, // criteria
            {...req.body} // new content
        );

        const updatedUser = await usuarioRepo.findOne({
            where:{
                id: user.id
            }
        })

        res.json({ok:true, user: updatedUser});

    }
    catch(err){
        next(err);
    }
}

export const userDelete = async (req: Request, res: Response, next: NextFunction) => {
    
    try{
        const userIdToDelete = req.params.userId;
        

        const userToDelete = await usuarioRepo.findOne({
            where: { id: parseInt(userIdToDelete) }
        });

        if(!userToDelete){
            res.status(404).json({ ok: false, message: "user not found"});
        }

        await usuarioRepo.delete(userIdToDelete);

        res.status(202).json({ok: true, message: 'user deleted'});

    }
    catch(err){
        next();
    }

}