import {Request, Response, NextFunction} from "express";
import { AppDataSource } from "../data-source";
import { TipoUsuario } from "../entity/TipoUsuario";

const tipoUsuarioRepo = AppDataSource.getRepository(TipoUsuario);

export const createTipoUsuario = async (req:Request, res: Response, next:NextFunction) => {

    const { nome } = req.body;

    try{

        const newTipoUsuario = new TipoUsuario();
        newTipoUsuario.nome = nome;

        await tipoUsuarioRepo.save(newTipoUsuario);

        res.json({
            ok: true,
            tipoUsuario: newTipoUsuario,
        });

    }catch(err){
        next(err);
    }

}
export const deleteTipoUsuario = async (req:Request, res: Response, next:NextFunction) => {
    const {id }  = req.params;

    try{

        const typeUsurioToDelete = await tipoUsuarioRepo.delete({ id: parseInt(id) });

        
        res.json({
            ok:true,
        });


    }catch(err){
        next(err);
    }
}
export const udpateTipoUsuario = async (req:Request, res: Response, next:NextFunction) => {

    const { id } = req.params;

    try{
        
        const tipoUsuario = await tipoUsuarioRepo.update({ id: parseInt(id)}, {...req.body});

        if(tipoUsuario){
            res.json({
                ok:true,
                message:'tipoUsuario updated'
            });
        }
        else{

            res.json({
                ok:false,
                message: "tipoUsuario could be updated"
            });
        }
    }catch(err){
        next(err);
    }
}
export const getTipoUsuarioList = async (req:Request, res: Response, next:NextFunction) => {

    try{

        const tipoUsuarioList = await tipoUsuarioRepo.find({
            relations:{
                usuario:true
            }
        });

        res.json({
            ok:true,
            total: tipoUsuarioList.length,
            tipoUsuarios: tipoUsuarioList
        })

    }catch(err){
        next(err);
    }
    
}
