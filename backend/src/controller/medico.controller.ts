import {Request, Response, NextFunction} from "express";
import { AppDataSource } from "../data-source";
import {Especialidade} from "../entity/Especialidade";
import { Medico } from "../entity/Medico";

const medicoRepo = AppDataSource.getRepository(Medico);
const especialidadeRepo = AppDataSource.getRepository(Especialidade);


export const createMedico = async (req:Request, res: Response, next:NextFunction) => {}
export const deleteMedico = async (req:Request, res: Response, next:NextFunction) => {}
export const udpateMedico = async (req:Request, res: Response, next:NextFunction) => {}
export const getMedico = async (req:Request, res: Response, next:NextFunction) => {}
