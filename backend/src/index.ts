import { Sequelize, DataTypes } from "sequelize";


const database = new Sequelize({
    dialect: "sqlite",
    storage: "./data.db",
    define:{
        freezeTableName:true
    }
});


database.authenticate()
.then( () => console.log("Database connected"))
.catch( (err) => {
    console.log(`Error while conntecting: ${err}`);
})

database.sync()
.then( () => {
    console.log('all models synchronized')
})
.catch( () => {
    console.log("models could not be synchronized")
})

const Usuario = database.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull:false,
    },
   
});

const TipoUsuario = database.define('TipoUsuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull:false,
    }
});


const SolicitacaoConsulta = database.define('SolicitacaoConsulta', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    dtSolicitacao:{
        type: DataTypes.DATEONLY,
        allowNull:false
    },
    hrSolicitacao:{
        type: DataTypes.TIME,
        allowNull:false
    }
});


const AgendamentoSolicitacao = database.define('AgendamentoSolicitacao', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    dtConsulta:{
        type: DataTypes.DATEONLY,
        allowNull:false
    },
    hrConsulta:{
        type: DataTypes.TIME,
        allowNull:false
    },
    dtAgendamento:{
        type: DataTypes.DATEONLY,
        allowNull:false
    },
    hrAgendamento:{
        type: DataTypes.TIME,
        allowNull:false
    },
});

const Medico = database.define('Medico', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    crm:{
        type: DataTypes.STRING,
        allowNull:false
    },
    nome:{
        type: DataTypes.STRING,
        allowNull:false
    }
});

const Especialidade = database.define('Especialidade', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull:false
    }
});


TipoUsuario.hasMany(Usuario);
Usuario.belongsTo(TipoUsuario);


Usuario.hasMany(SolicitacaoConsulta);
SolicitacaoConsulta.belongsTo(Usuario);

Especialidade.hasMany(Medico);
Medico.belongsTo(Especialidade);

SolicitacaoConsulta.hasOne(AgendamentoSolicitacao);
AgendamentoSolicitacao.belongsTo(SolicitacaoConsulta);

Medico.hasMany(SolicitacaoConsulta);
SolicitacaoConsulta.belongsTo(Medico);

Especialidade.hasMany(SolicitacaoConsulta);
SolicitacaoConsulta.belongsTo(Especialidade);


async function insertData(){
    const agendamento1 = {
        dtConsulta: '01/02/2005',
        hrConsulta: '12:23:56',
        dtAgendamento: "",
        hrAgendamento: "",
        UsuarioId:1,
        EspecialidadeId: 3,
        MedicoId: 3
    }
    const agendamento2 = {
        dtConsulta: '01/02/1555',
        hrConsulta: '00:00:00',
        dtAgendamento: "",
        hrAgendamento: "",
        UsuarioId:1,
        EspecialidadeId: 1,
        MedicoId: 1,
    }
    const agendamento3 = {
        dtConsulta: '01/02/2051',
        hrConsulta: '00:03:56',
        dtAgendamento: "",
        hrAgendamento: "",
        UsuarioId:1,
        EspecialidadeId: 2,
        MedicoId: 2
    }

    await SolicitacaoConsulta.create(agendamento1);
    await SolicitacaoConsulta.create(agendamento2);
    await SolicitacaoConsulta.create(agendamento3);
}
async function getData(){

    const data = await Medico.findAll({
        where: { id:3},
        include:[
            {model: SolicitacaoConsulta, include:[Usuario]}
        ]
    });

    data.forEach((item) => {
        const nomeCliente = item.toJSON().nome;
        
        console.log('Medico Name: ',nomeCliente);
        item.toJSON().SolicitacaoConsulta.forEach( item => {
            console.log('Paciente Name: ',item.Usuario.nome);
        })
    });
}

( async () => {
    // const tipoUsuario = [{nome: "paciente"}, {nome: 'Medico'}]
    // await TipoUsuario.bulkCreate(tipoUsuario);

    // const especialidades= [{nome: "Destista"},{nome: "Ortopedista"},{nome:"Cirurgião"}];
    // await Especialidade.bulkCreate(especialidades);


    // insertData()

    // Testes Relacoes:
    // TipoUsuario e Usario   ( One to Many )   : OK
    // Medico e Especialidade ( One to Many )   : OK
    // SolicitacarConsulte e Medico, Usuario e Especialidade (One to Many): OK

    // getData();


})();