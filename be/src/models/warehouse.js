const Sequelize = require("sequelize");
const db = require("../db/db");

const warehouse = db.define("warehouses", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    x: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    y: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

module.exports = warehouse;
