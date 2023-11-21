import {Request, Response, NextFunction} from "express";
import { AppDataSource } from "../data-source";
import { AgendamentoConsulta } from "../entity/AgendamentoConsulta";
import { Usuario } from "../entity/Usuario";
import { Medico } from "../entity/Medico";
import { Especialidade } from "../entity/Especialidade";

const agendamentoRepo = AppDataSource.getRepository(AgendamentoConsulta)
const usuarioRepo = AppDataSource.getRepository(Usuario);
const medicoRepo = AppDataSource.getRepository(Medico);
const especialidadeRepo = AppDataSource.getRepository(Especialidade);

export const createSolicitacao = async (req:Request, res: Response, next:NextFunction) => {}
export const deleteSolicitacao = async (req:Request, res: Response, next:NextFunction) => {}
export const udpateSolicitacao = async (req:Request, res: Response, next:NextFunction) => {}
export const getSolicitacao = async (req:Request, res: Response, next:NextFunction) => {}
