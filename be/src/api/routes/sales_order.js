const { Router } = require("express");
const router = Router();
const item = require("../../models/item");
const { flattenQueryResults } = require("../../utils");
const sales_order_validators = require("../middlewares/validators/sales_order");

module.exports = (app) => {
    app.use("/sales-order", router);

    /**
     * Gets picked items for a sales order
     */
    router.get("/:id/picked-items", sales_order_validators.get, async (req, res) => {
        const { id } = req.params;

        const items = await item.findAll({
            where: {
                sales_order: id,
            },
        });

        return res.json(flattenQueryResults(items));
    });
};
