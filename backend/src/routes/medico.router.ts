import express from "express";
import { getMedicoList, createMedico,loginMedico, deleteMedico, udpateMedico} from "../controller/medico.controller"
export const medicoRouter = express.Router();

medicoRouter.post('/login', loginMedico);
medicoRouter.get("/list/:especialidadeId", getMedicoList );
medicoRouter.post("/create", createMedico);
medicoRouter.put("/update/:id", udpateMedico );
medicoRouter.delete("/delete/:id", deleteMedico );



