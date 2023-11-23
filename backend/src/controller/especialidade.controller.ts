import {Request, Response, NextFunction} from "express";
import { AppDataSource } from "../data-source";
import { Especialidade } from "../entity/Especialidade";


const especialidadeRepo = AppDataSource.getRepository(Especialidade);

export const createEspecialidade = async (req:Request, res: Response, next:NextFunction) => {
    const { nome } = <Especialidade>req.body;

    try{

        const especialidade = new Especialidade();
        especialidade.nome = nome;
        
        await especialidadeRepo.save(especialidade)

        res.json({
            ok:true,
            especialidade: especialidade
        });

    }catch(err){
        next(err);
    }

}
export const deleteEspecialidade = async (req:Request, res: Response, next:NextFunction) => {

    const { id } = req.params;

    try{

        const especialidadeToDelete = await especialidadeRepo.delete({ id: parseInt(id) })

        if(especialidadeToDelete){
            res.json({ ok: true, message: "especialidade deletada" });
        }
        else{
            res.json({ ok: true, message:"Especialidade não deletada" });
        }


    }catch(err){
        next(err);
    }
}
export const udpateEspecialidade = async (req:Request, res: Response, next:NextFunction) => {

    const { nome } = <Especialidade>req.body;
    const { id } = req.params;

    try{
        
        const updatedEspecialidade = await especialidadeRepo.update({ id: parseInt(id) }, { nome: nome});

        if(updatedEspecialidade){
            res.json({
                ok: true, 
                message: "Especialidade Atualizada",
                especialidade: updatedEspecialidade
            });
        }
        else{
            res.json({
                ok: false, 
                message: "Especialidade Não Atualizada"
            });
        }
    }
    catch(err){
        next(err);
    }
}
export const getEspecialidadeList = async (req:Request, res: Response, next:NextFunction) => {

    try{

        const especialidadeList = await especialidadeRepo.find();


        res.json({
            ok: true,
            total: especialidadeList.length,
            especialidades: especialidadeList
        });
        
    }catch(err){
        next(err);
    }
}
