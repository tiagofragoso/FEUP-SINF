const { Router } = require("express");
const router = Router();
const item = require("../../models/item");

module.exports = (app) => {
    app.use("/sales-order", router);

    /**
     * Gets picked items for a sales order
     * @param {String} id Sales Order id
     * @returns {200} Success
     * @returns {500} Internal Error
     */
    router.get("/:id/picked-items", (req, res) => {
        const { id } = req.params;

        item.findAll({
            where: {
                sales_order: id,
            },
        })
            .then((query_res) => {
                const items = query_res.map(({ dataValues }) => dataValues);
                res.json(items);
            })
            .catch(() => {
                res.status(500).send("Failure");
            });
    });
};
