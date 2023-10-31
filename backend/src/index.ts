
import { AppDataSource } from "./data-source";
import { Usuario } from "./entity/Usuario";
import { TipoUsuario } from "./entity/TipoUsuario";
import { Especialidade } from "./entity/Especialidade";
import { Medico } from "./entity/Medico";
import { SolicitacaoConsulta } from "./entity/SolicitacaoConsulta";

AppDataSource.initialize()
    .then(async () => {
       console.log("data source has been initialized");

    })
    .catch(error => console.log(error));

