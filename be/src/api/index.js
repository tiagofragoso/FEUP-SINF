const { Router } = require("express");
const picking_wave = require("./routes/picking_wave");
const sales_order = require("./routes/sales_order");

module.exports = () => {
    const app = Router();
    picking_wave(app);
    sales_order(app);

    return app;
};
