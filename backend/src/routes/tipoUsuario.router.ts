import express from "express";
import { createTipoUsuario, deleteTipoUsuario, getTipoUsuarioList, udpateTipoUsuario } from "../controller/typoUsuario.controller";

export const tipoUsuarioRouter = express.Router();

tipoUsuarioRouter.get("/list", getTipoUsuarioList);
tipoUsuarioRouter.put("/update/:id", udpateTipoUsuario);
tipoUsuarioRouter.delete("/delete/:id", deleteTipoUsuario);
tipoUsuarioRouter.post("/create", createTipoUsuario );

