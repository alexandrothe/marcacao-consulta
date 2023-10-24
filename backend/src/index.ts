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



