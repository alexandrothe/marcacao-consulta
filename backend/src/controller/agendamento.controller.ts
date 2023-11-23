import {Request, Response, NextFunction} from "express";
import { AppDataSource } from "../data-source";
import { AgendamentoConsulta } from "../entity/AgendamentoConsulta";

const agendamentoRepo = AppDataSource.getRepository(AgendamentoConsulta)

export const createAgendamento = async (req:Request, res: Response, next:NextFunction) => {

    const { solicitacaoId, usuarioId } = <AgendamentoConsulta>req.body;

    try{

        const agendamento = new AgendamentoConsulta();
        agendamento.solicitacaoId = solicitacaoId;
        agendamento.usuarioId = usuarioId;

        await agendamentoRepo.save(agendamento);

        res.json({ ok:true, agendamento: agendamento });

    }catch(err){
        next(err);
    }


}
export const deleteAgendamento = async (req:Request, res: Response, next:NextFunction) => {

    const { id } = req.params;

    try{

        const agendamentoToDelete = await agendamentoRepo.delete({ id: parseInt(id) });

        res.json({ 
            ok:true,
        });
        
    }catch(err){
        next(err);
    }

}
export const udpateAgendamento = async (req:Request, res: Response, next:NextFunction) => {
    const { id } = req.params;


    try{

        const agedamentoUpdate = await agendamentoRepo.update({ id: parseInt(id)}, { ...req.body });

        res.json({ ok: true, })


    }catch(err){
        next(err);
    }
}

export const getAgendamento = async (req:Request, res: Response, next:NextFunction) => {
    const { id } = req.params;

    try{
        
        const agendamento = await agendamentoRepo.findOne({
            where:{
                id: parseInt(id)
            },
            relations:{
                solicitacao:true,
                usuario:true
            }
        });


        if(!agendamento){
            res.status(404).json({
                ok:false,
                message: "Agendamento não encotrado"
            });
        }

        else{
            res.json({
                ok:true,
                agendamento: agendamento
            });
        }

    }catch(err){
        next(err);
    }
}


export const getAgendamentoList = async (req:Request, res: Response, next:NextFunction) => {
    try{
        
        const agendamentoList = await agendamentoRepo.find({
            relations:{
                solicitacao:true,
                usuario:true
            }
        });

        res.json({
            ok:true,
            total: agendamentoList.length ,
            agendamentos: agendamentoList
        });


    }catch(err){
        next(err);
    }
}
