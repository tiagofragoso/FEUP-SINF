const Sequelize = require("sequelize");
const db = require("../db/db");
const picking_wave = require("./picking_wave");

const item = db.define("items", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    item_key: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    picking_wave_id: {
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
}, { underscored: true });

item.belongsTo(picking_wave);

module.exports = item;
