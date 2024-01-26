import { Sequelize } from "sequelize";
import db from "../config/db.config.js";
// import Tickets from "./ticketModels.js";

const { DataTypes } = Sequelize;

const TicketActivity = db.define(
    "ticketActivity",
    {
        activityType: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [["Not Started", "In Progress", "Done"]],
                notEmpty: true,
            },
        },
    },
    {
        freezeTableName: true,
    }
);

// TicketActivity.belongsTo(Tickets,{
//     foreignKey: "ticketId",
//     targetKey: "id",
//     allowNull: false
// })

(async () => {
    await db.sync();
})();

export default TicketActivity;
