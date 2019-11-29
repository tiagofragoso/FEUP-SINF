const Sequelize = require("sequelize");
const db = require("../db/db");

const picking_wave = db.define("picking_waves", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    due_date: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    is_done: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: "false",
    },
});

module.exports = picking_wave;
