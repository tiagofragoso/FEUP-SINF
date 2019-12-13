const Sequelize = require("sequelize");
const db = require("../db/db");
const picking_wave = require("./picking_wave");

const item = db.define("items", {
    item_key: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    picking_wave: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: picking_wave,
            key: "id",
        },
    },
    sales_order: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: { min: 0 },
    },
    is_picked: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: "false",
    },
});

module.exports = item;
