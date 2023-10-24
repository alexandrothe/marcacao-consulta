import { Sequelize, DataTypes } from "sequelize";


const database = new Sequelize({
    dialect: "sqlite",
    storage: "./data.db"
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
    }
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
