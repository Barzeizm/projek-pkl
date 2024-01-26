import { Sequelize } from "sequelize";
import db from "../config/db.config.js";
import Users from "./userModel.js";

const { DataTypes } = Sequelize;

const Assignee = db.define(
    "assignee",
    {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: false,
            },
        },
    },
    {
        freezeTableName: true,
    }
);

Assignee.belongsTo(Users, {
    foreignKey: "userId",
    references: {
        model: Users,
        key: "id",
    },
    allowNull: false,
});

(async () => {
    await db.sync();
})();

export default Assignee;
