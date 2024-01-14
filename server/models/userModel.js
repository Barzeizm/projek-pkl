// userModels.js
import { Sequelize } from "sequelize";
import db from "../config/db.config.js";
import Roles from "./roleModels.js";

const { DataTypes } = Sequelize;

const Users = db.define(
    "users",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    {
        freezeTableName: true,
    }
);

// Define the association
Users.belongsTo(Roles, {
    foreignKey: "roleId", // The foreign key in the Users table
    allowNull: false, // Users must have a role
});

(async () => {
    await db.sync();
})();

export default Users;
