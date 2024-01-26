import { Sequelize } from "sequelize";
import db from "../config/db.config.js";
import Users from "./userModel.js";
import Comment from "./commentModels.js";
import TicketActivity from "./ticketActivityModels.js";
import TicketStatus from "./ticketStatusModels.js";

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
        priority: {
            type: DataTypes.ENUM("Low", "Medium", "High", "Critically"),
            allowNull: true,
            validate: {
                notEmpty: false,
            },
        },
        assignee: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        createdBy: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        activityType: {
            type: DataTypes.ENUM("Not Started", "In Progress", "Done"),
            allowNull: true,
        },
        statusType: {
            type: DataTypes.ENUM("Open", "Closed", "Warning"),
            allowNull: true,
        },
    },
    {
        freezeTableName: true,
    }
);

// Define associations after all models are defined
Tickets.belongsTo(Users, {
    foreignKey: "assignee",
    targetKey: "email",
    allowNull: false,
});

Tickets.hasMany(Comment, {
    foreignKey: "ticketId",
    onDelete: "CASCADE",
});
Comment.belongsTo(Tickets, {
    foreignKey: "ticketId",
});

(async () => {
    await db.sync();
})();

export default Tickets;
