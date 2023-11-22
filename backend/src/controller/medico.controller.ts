import {Request, Response, NextFunction} from "express";
import { AppDataSource } from "../data-source";
import {Especialidade} from "../entity/Especialidade";
import { Medico } from "../entity/Medico";

const medicoRepo = AppDataSource.getRepository(Medico);
const especialidadeRepo = AppDataSource.getRepository(Especialidade);


export const createMedico = async (req:Request, res: Response, next:NextFunction) => {
    const { crm, nome, especialidadeId } = <Medico>req.body;

    try{

        const medico = new Medico();
        medico.crm = crm;
        medico.nome = nome;
        medico.especialidadeId = especialidadeId;

        await medicoRepo.save(medico);

        res.json({
            ok:true,
            message: "Medico criado",
            medico: medico
        });
        
    }catch(err){
        next(err);
    }
}

export const deleteMedico = async (req:Request, res: Response, next:NextFunction) => {
    const { id } = req.params;

    try{

        const medicoToDelete = await medicoRepo.delete({ id: parseInt(id) });
   
        if(medicoToDelete){
            res.json({
                ok: true,
                message: "Medico deletado"
            });
        }

        else{
            res.json({
                ok:false,
                message: "Medico não Deletada"
            });
        }


    }catch(err){
        next(err);
    }
}
export const udpateMedico = async (req:Request, res: Response, next:NextFunction) => {

    const { id } = req.params;
    const { crm, nome, especialidadeId  } = <Medico>req.body;

    try{

        const medicoToUpdate = await medicoRepo.update(
            {id: parseInt(id)},
            {
                crm: crm,
                nome:nome,
                especialidadeId: especialidadeId
            }
        );

        if(medicoToUpdate){
            res.json({
                ok:true,
                message: "Medico Atualizado",
                medico: medicoToUpdate
            });
        }
        else{
            res.json({
                ok:false,
                message: "Medico não Atualizado"
            })
        }


    }catch(err){
        next(err);
    }
}


export const getMedicoList = async (req:Request, res: Response, next:NextFunction) => {

    try{


        const medicoList = await medicoRepo.find({
            relations:{
                especialidade:true
            }
        });


        res.json({
            ok:true,
            medicos: medicoList
        })

    }catch(err){
        next(err);
    }

}
