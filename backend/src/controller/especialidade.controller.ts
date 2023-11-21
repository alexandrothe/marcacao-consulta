import {Request, Response, NextFunction} from "express";
import { AppDataSource } from "../data-source";
import { Medico } from "../entity/Medico";
import { Especialidade } from "../entity/Especialidade";

const medicoRepo = AppDataSource.getRepository(Medico);
const especialidadeRepo = AppDataSource.getRepository(Especialidade);

export const createEspecialidade = async (req:Request, res: Response, next:NextFunction) => {}
export const deleteEspecialidade = async (req:Request, res: Response, next:NextFunction) => {}
export const udpateEspecialidade = async (req:Request, res: Response, next:NextFunction) => {}
export const getEspecialidade = async (req:Request, res: Response, next:NextFunction) => {}
