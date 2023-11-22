import express from "express";
import { getEspecialidadeList, deleteEspecialidade, udpateEspecialidade, createEspecialidade} from "../controller/especialidade.controller";

export const especialidadeRouter = express.Router();

especialidadeRouter.get("/list", getEspecialidadeList);
especialidadeRouter.post("/create", createEspecialidade);
especialidadeRouter.delete("/delete/:id",  deleteEspecialidade);
especialidadeRouter.put("/update/:id", udpateEspecialidade);

