import express from "express";
import {
    getAgendamento,
    getAgendamentoList,
    udpateAgendamento,
    deleteAgendamento,
    createAgendamento
} from '../controller/agendamento.controller';



export const agendamentoRouter = express.Router();

agendamentoRouter.get("/one/:id", getAgendamento);
agendamentoRouter.get("/list", getAgendamentoList);

agendamentoRouter.post("/create", createAgendamento);
agendamentoRouter.put("/update/:id", udpateAgendamento);
agendamentoRouter.delete("/delete/:id", deleteAgendamento);



