import "reflect-metadata"
import  { DataSource } from "typeorm"
import { Usuario } from "./entity/Usuario"
import { Medico } from "./entity/Medico"
import { Especialidade } from "./entity/Especialidade"
import { AgendamentoConsulta } from "./entity/AgendamentoConsulta"
import { SolicitacaoConsulta } from "./entity/SolicitacaoConsulta"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.db",
    synchronize: true,
    logging: false,
    entities: [ Usuario, Medico, Especialidade, AgendamentoConsulta, SolicitacaoConsulta ],
    migrations: [],
    subscribers: [],
    
})