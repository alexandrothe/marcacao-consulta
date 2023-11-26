import {Request, Response, NextFunction} from "express";
import { AppDataSource } from "../data-source";
import { Medico } from "../entity/Medico";

const medicoRepo = AppDataSource.getRepository(Medico);

export const loginMedico = async(req: Request, res: Response, next: NextFunction) => {

    const {crmCode, password} = <Medico>req.body;
    
    try{
        const medico = await medicoRepo.findOne({
            where:{
                crmCode: crmCode,
                password: password
            },
            relations:{
                especialidade:true,
            }
        });

        if(!medico){
            res.status(404).json({ ok: false, message: "medico not found"});
        }else{
            res.json({ ok: true, medico: medico});
        }

    }
    catch(err){
        next(err);
    }
}

export const createMedico = async (req:Request, res: Response, next:NextFunction) => {
    const { crmCode, name, especialidadeId, sex, birthDay, password} = <Medico>req.body;

    try{

        const medico = new Medico();
        medico.crmCode = crmCode;
        medico.name = name;
        medico.especialidadeId = especialidadeId;
        medico.birthDay = birthDay;
        medico.sex = sex;
        medico.password = password;


        await medicoRepo.save(medico);

        res.json({
            ok:true,
            message: "Medico criado",
            medico: medico
        });
        
    }catch(err){
        console.log(err)
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

    try{

        const medicoToUpdate = await medicoRepo.findOne({
            where:{
                id: parseInt(id)
            }
        });

        if(!medicoToUpdate){
            res.json({
                ok:false,
                message: "medico not found"
            });
        }
        else{

            await medicoRepo.update({ id: medicoToUpdate.id, crmCode: medicoToUpdate.crmCode },{ ...req.body});

            const updatedMedico = await medicoRepo.findOne({ 
                where:{
                    id: medicoToUpdate.id
                }
            });

            res.json({
                ok:true,
                medico: updatedMedico
            })
        }

    }catch(err){
        next(err);
    }
}


export const getMedicoList = async (req:Request, res: Response, next:NextFunction) => {

    try{
        const {especialidadeId} = req.params;
        
        const medicoList = await medicoRepo.find({
            where:{
                especialidadeId: parseInt(especialidadeId)
            },
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
