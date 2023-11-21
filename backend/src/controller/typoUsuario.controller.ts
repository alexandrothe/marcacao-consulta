import {Request, Response, NextFunction} from "express";
import { AppDataSource } from "../data-source";
import { TipoUsuario } from "../entity/TipoUsuario";

const tipoUsuarioRepo = AppDataSource.getRepository(TipoUsuario);

export const createTipoUsuario = async (req:Request, res: Response, next:NextFunction) => {}
export const deleteTipoUsuario = async (req:Request, res: Response, next:NextFunction) => {}
export const udpateTipoUsuario = async (req:Request, res: Response, next:NextFunction) => {}
export const getTipoUsuario = async (req:Request, res: Response, next:NextFunction) => {}
