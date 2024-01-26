import { Sequelize } from "sequelize";
import db from "../config/db.config.js";

const { DataTypes } = Sequelize;

const TicketStatus = db.define(
    "ticketStatus",
    {
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [["Open", "Closed", "Warning"]],
                notEmpty: true,
            },
        },
    },
    {
        freezeTableName: true,
    }
);

(async () => {
    await db.sync();
})();

export default TicketStatus;
