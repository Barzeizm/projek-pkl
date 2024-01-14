import { Sequelize } from "sequelize";
import db from "../config/db.config.js";
import Users from "./userModel.js";

const { DataTypes } = Sequelize;

const Tickets = db.define(
    "ticket",
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        status: {
            type: DataTypes.ENUM("Not Started", "In Progress", "Done"),
            allowNull: true,
            validate: {
                notEmpty: false,
            },
        },
        priority: {
            type: DataTypes.ENUM("Low", "Medium", "High", "Critically"),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        userId: {
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

Tickets.belongsTo(Users, {
    foreignKey: "userId",
    targetKey: "id",
    allowNull: false,
});

(async () => {
    await db.sync();
})();

// db.sync()
//     .then(() => {
//         console.log("Database synced!");
//     })
//     .catch((err) => {
//         console.error("Error syncing database:", err);
//     });

export default Tickets;
