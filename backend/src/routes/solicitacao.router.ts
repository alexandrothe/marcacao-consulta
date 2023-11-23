import express from "express";
import {getSolicitacao, getSolicitacaoList, udpateSolicitacao,deleteSolicitacao, createSolicitacao} from '../controller/solicitacao.controller';

export const solicitacaoRouter = express.Router();

solicitacaoRouter.get("/one/:id", getSolicitacao);
solicitacaoRouter.get("/list", getSolicitacaoList);

solicitacaoRouter.post("/create", createSolicitacao);
solicitacaoRouter.put("/update/:id", udpateSolicitacao);
solicitacaoRouter.delete("/delete/:id", deleteSolicitacao);


