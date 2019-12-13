const { Router } = require("express");
const picking_wave = require("./routes/picking_wave");
const sales_order = require("./routes/sales_order");
const warehouse_zone = require("./routes/warehouse_zone");
const login = require("./routes/login");

module.exports = () => {
    const app = Router();
    picking_wave(app);
    sales_order(app);
    warehouse_zone(app);
    login(app);

    return app;
};
