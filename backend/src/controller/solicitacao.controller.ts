import {Request, Response, NextFunction} from "express";
import { AppDataSource } from "../data-source";
import { SolicitacaoConsulta } from "../entity/SolicitacaoConsulta";

const solicitacaoRepo = AppDataSource.getRepository(SolicitacaoConsulta);

export const createSolicitacao = async (req:Request, res: Response, next:NextFunction) => {
    const { especialidadeId, medicoId, description, usuarioId } = <SolicitacaoConsulta>req.body;

    try{

        const solicitacao = new SolicitacaoConsulta();
        solicitacao.especialidadeId = especialidadeId;
        solicitacao.usuarioId = usuarioId;
        solicitacao.medicoId = medicoId;
        solicitacao.description = description;

        await solicitacaoRepo.save(solicitacao);

        res.json({
            ok:true,
            solictacao: solicitacao,
        });

    }catch(err){
        next(err);
    }
    
}
export const deleteSolicitacao = async (req:Request, res: Response, next:NextFunction) => {

    const { id } = req.params;


    try{
        const solicitacaoToDelete = await solicitacaoRepo.delete({ id: parseInt(id) });

        res.json({ ok: true });
    }
    catch(err){
        next(err);
    }
}

export const udpateSolicitacao = async (req:Request, res: Response, next:NextFunction) => {

    const { id } = req.params;
  

    try{

        const solicitacaoUpdate = await solicitacaoRepo.update({id: parseInt(id)},{...req.body});

        res.json({
            ok:true,
            solicitacao: solicitacaoUpdate
        });


    }catch(err){
        next(err);
    }

}
export const getSolicitacao = async (req:Request, res: Response, next:NextFunction) => {
    const { id } = req.params;

    try{

        const solicitacao = await solicitacaoRepo.findOne({
            where: { id: parseInt(id) },
            relations:{
                medico:true,
                especialidade:true,
                usuario:true
            }
        });

        if(!solicitacao){
            res.status(404).json({
                ok:false,
                message: "solicitação não encontrada"
            });
        }
        else{
            res.json({
                ok:true,
                solicitacao: solicitacao
            })
        }

    }catch(err){
        next(err);
    }
}

export const getSolicitacoesMedico = async(req: Request, res: Response, next: NextFunction) => {
    const {medicoId} = req.params;

    try{

        const solicitacaoList = await solicitacaoRepo.find({
            where:{
                medicoId: parseInt(medicoId)
            },
            relations:{
                medico:true,
                usuario:true,
                especialidade:true,
                agendamento:true,
            }
        });

        res.json({ ok: true, solicitacaoes: solicitacaoList});

    }catch(err){
        next(err);
    }
}

export const getSolicitacoesPaciente = async (req:Request, res: Response, next:NextFunction) => {

    try{
        const { userId } = req.params;
        
        const solicitacaoList = await solicitacaoRepo.find({
            where:{
                usuarioId: parseInt(userId)
            },
            relations:{
                medico:true,
                usuario:true,
                especialidade:true,
                agendamento:true,
            }
        });

        res.json({ ok: true, solicitacaoes: solicitacaoList });

    }catch(err){
        next(err);
    }
}

