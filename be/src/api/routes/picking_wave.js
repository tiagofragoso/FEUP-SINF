const { Router } = require("express");
const router = Router();
const picking_wave = require("../../models/picking_wave");
const item = require("../../models/item");
const { flattenQueryResults } = require("../../utils");
const picking_wave_validators = require("../middlewares/validators/picking_wave");

module.exports = (app) => {
    app.use("/picking-wave", router);

    /**
     * Gets all the picking waves
     */
    router.get("/", async (_, res) => {
        const picking_waves = await picking_wave.findAll();

        return res.json(flattenQueryResults(picking_waves));
    });

    /**
     * Gets all items in a picking wave
     */
    router.get("/:id", picking_wave_validators.get, async (req, res) => {
        const { id } = req.params;

        const items = await item.findAll({
            where: {
                picking_wave: id,
            },
        });

        return res.json(flattenQueryResults(items));
    });

    /**
     * Creates a new picking wave
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
};
