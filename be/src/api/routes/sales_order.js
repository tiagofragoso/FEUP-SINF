const { Router } = require("express");
const router = Router();
const item = require("../../models/item");
const picking_wave = require("../../models/picking_wave");
const { flattenQueryResults } = require("../../utils");
const sales_order_validators = require("../middlewares/validators/sales_order");

module.exports = (app) => {
    app.use("/sales-order", router);

    /**
     * Gets Items for a Sales Order
     */
    router.get("/:id/picked-items", sales_order_validators.get, async (req, res) => {
        const { id } = req.params;

        const items = await item.findAll({
            where: {
                sales_order: id,
            },
            include: [{
                model: picking_wave,
            }],
        });

        return res.json(flattenQueryResults(items));
    });
};
