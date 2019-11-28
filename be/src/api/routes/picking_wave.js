const { Router } = require("express");
const router = Router();
const picking_wave = require("../../models/picking_wave");
const item = require("../../models/item");
const { flattenQueryResults } = require("../../utils");
const picking_wave_validators = require("../middlewares/validators/picking_wave");
const item_validators = require("../middlewares/validators/item");

module.exports = (app) => {
    app.use("/picking-wave", router);

    /**
     * Gets all the Picking Waves
     */
    router.get("/", async (_, res) => {
        const picking_waves = await picking_wave.findAll();

        return res.json(flattenQueryResults(picking_waves));
    });

    /**
     * Gets all Items in a Picking Wave
     */
    router.get("/:id", picking_wave_validators.get, picking_wave_validators.exists, async (req, res) => {
        const { id } = req.params;

        const items = await item.findAll({
            where: {
                picking_wave: id,
            },
        });

        return res.json(flattenQueryResults(items));
    });

    /**
     * Marks a Picking Wave as done
     */
    router.put("/:id/finish", picking_wave_validators.get, picking_wave_validators.exists, (req, res) => {
        const { pwave } = req.locals;

        pwave.update({
            is_done: true,
        });

        return res.status(200).send();
    });

    /**
     * Creates a new Picking Wave
     */
    router.post("/", picking_wave_validators.create, async (req, res) => {
        const { name, due_date } = req.body;

        await picking_wave.create(
            {
                name,
                due_date,
            },
            {
                fields: ["name", "due_date"],
            },
        );

        return res.status(201).send();
    });

    /**
     * Adds new Items to Picking Wave
     */
    router.patch("/:id", picking_wave_validators.addItem, picking_wave_validators.exists, item_validators.isUnique, async (req, res) => {
        const { id } = req.params;

        const {
            item_key, sales_order, name, quantity,
        } = req.body;

        await item.create(
            {
                item_key,
                picking_wave: id,
                sales_order,
                name,
                quantity,
            },
            {
                fields: ["item_key", "picking_wave", "sales_order", "name", "quantity"],
            },
        );

        return res.status(201).send();
    });
};
