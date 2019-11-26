const { Router } = require("express");
const router = Router();
const item = require("../../models/item");
const { flattenQueryResults } = require("../../utils");

module.exports = (app) => {
    app.use("/sales-order", router);

    /**
     * Gets picked items for a sales order
     * @param {String} id Sales Order id
     * @returns {200} Success
     * @returns {500} Internal Error
     */
    router.get("/:id/picked-items", async (req, res) => {
        const { id } = req.params;

        const items = await item.findAll({
            where: {
                sales_order: id,
            },
        });

        return res.json(flattenQueryResults(items));
    });
};
