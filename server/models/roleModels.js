// roleModels.js
import { Sequelize } from "sequelize";
import db from "../config/db.config.js";

const { DataTypes } = Sequelize;

const Roles = db.define(
  "roles",
  {
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Customer", "Customer Service", "Administrator"]],
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

export default Roles;
