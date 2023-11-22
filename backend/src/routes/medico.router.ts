import express from "express";
import { getMedicoList, createMedico, deleteMedico, udpateMedico} from "../controller/medico.controller"
export const medicoRouter = express.Router();

medicoRouter.get("/list", getMedicoList );
medicoRouter.post("/create", createMedico);
medicoRouter.put("/update/:id", udpateMedico );
medicoRouter.delete("/delete/:id", deleteMedico );



