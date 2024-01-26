import { Sequelize } from "sequelize";
import db from "../config/db.config.js";
import Users from "./userModel.js";

const { DataTypes } = Sequelize;

const Comment = db.define(
    "comment",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
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
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
    },
    {
        freezeTableName: true,
    }
);

// Define associations
Comment.belongsTo(Users, {
    foreignKey: "createdBy",
    targetKey: "email",
    allowNull: false,
});

export default Comment;
