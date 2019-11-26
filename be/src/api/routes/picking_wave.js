const { Router } = require("express");
const router = Router();
const picking_wave = require("../../models/picking_wave");
const item = require("../../models/item");

module.exports = (app) => {
    app.use("/picking-wave", router);

    /**
     * Gets all the picking waves
     */
    router.get("/", (_, res) => {
        picking_wave.findAll({
            attributes: ["name", "due_date", "is_done"],
        })
            .then((query_res) => {
                const picking_waves = query_res.map(({ dataValues }) => dataValues);
                res.json(picking_waves);
            })
            .catch(() => {
                res.status(500);
                res.send("Failure");
            });
    });

    /**
     * Gets all items in a picking wave
     * @param {Integer} id Picking wave id
     */
    router.get("/:id", (req, res) => {
        const { id } = req.params;

        if (isNaN(id)) {
            res.status(400);
            res.send("The picking order id must be an Integer");
            return;
        }

        item.findAll({
            attributes: ["item_key", "picking_wave", "sales_order", "name", "warehouse", "quantity"],
            where: {
                picking_wave: parseInt(id, 10),
            },
        })
            .then((query_res) => {
                const items = query_res.map(({ dataValues }) => dataValues);
                res.json(items);
            })
            .catch(() => {
                res.status(500);
                res.send("Failure");
            });
    });
};
