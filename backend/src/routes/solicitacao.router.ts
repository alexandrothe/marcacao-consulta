import express from "express";
import {
    getSolicitacao,
    getSolicitacoesPaciente,
    getSolicitacoesMedico,
    udpateSolicitacao,
    deleteSolicitacao,
    createSolicitacao
} from '../controller/solicitacao.controller';

export const solicitacaoRouter = express.Router();

solicitacaoRouter.get("/one/:id", getSolicitacao);
solicitacaoRouter.get("/paciente/list/:userId", getSolicitacoesPaciente);
solicitacaoRouter.get("/medico/list/:medicoId", getSolicitacoesMedico);

solicitacaoRouter.post("/create", createSolicitacao);
solicitacaoRouter.put("/update/:id", udpateSolicitacao);
solicitacaoRouter.delete("/delete/:id", deleteSolicitacao);


