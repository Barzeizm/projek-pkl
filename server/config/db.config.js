import { Sequelize } from "sequelize";

const db = new Sequelize('ticketing', 'root', '',{
    host : "localhost",
    dialect : "mysql"
})

export default db;