const { Router } = require("express");
const router = Router();
const picking_wave = require("../../models/picking_wave");
const item = require("../../models/item");
const { flattenQueryResults } = require("../../utils");
const picking_wave_validators = require("../middlewares/validators/picking_wave");
const item_validators = require("../middlewares/validators/item");
const { Op } = require("sequelize");

const getPWaveCompletionPercentage = async (pwave_id) => {
    const items = flattenQueryResults(await item.findAll({
        where: {
            picking_wave: pwave_id,
        },
    }));

    if (items.length === 0) {
        return "";
    } else {
        const num_picked_items = items.filter((item) => item.is_picked).length;
        return ((num_picked_items / items.length) * 100).toFixed(2);
    }
};

module.exports = (app) => {
    app.use("/picking-wave", router);

    /**
     * Gets all the in progress Picking Waves
     */
    router.get("/", async (_, res) => {
        const picking_waves = flattenQueryResults(await picking_wave.findAll({
            where: {
                [Op.or]: [{ is_done: "false" }, { is_done: 0 }],
            },
        }));

        for (const pwave of picking_waves) {
            pwave.completion_percentage = await getPWaveCompletionPercentage(pwave.id);
        }

        return res.json(picking_waves);
    });

    /**
     * Gets all the finished Picking Waves
     */
    router.get("/finished", async (_, res) => {
        const picking_waves = flattenQueryResults(await picking_wave.findAll({
            where: {
                [Op.or]: [{ is_done: "true" }, { is_done: 1 }],
            },
        }));

        for (const pwave of picking_waves) {
            pwave.completion_percentage = await getPWaveCompletionPercentage(pwave.id);
        }

        return res.json(picking_waves);
    });

    /**
     * Gets all Items in a Picking Wave
     */
    router.get("/:id/items", picking_wave_validators.get, picking_wave_validators.exists, async (req, res) => {
        const { id } = req.params;

        const items = await item.findAll({
            where: {
                picking_wave: id,
            },
        });

        return res.json(flattenQueryResults(items));
    });

    /**
     * Gets Picking Wave Info
     */
    router.get("/:id/info", picking_wave_validators.get, picking_wave_validators.exists, async (req, res) => {
        const { pwave } = req.locals;
        const { id } = req.params;

        const pwave_info = pwave.dataValues;
        pwave_info.completion_percentage = await getPWaveCompletionPercentage(id);

        return res.json(pwave_info);
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

    /**
     * Picks an Item from the Picking wave
     */
    router.put("/:id/item/:item_key", picking_wave_validators.exists, item_validators.exists, (req, res) => {
        const { i } = req.locals;

        i.update({
            is_picked: true,
        });

        return res.status(200).send();
    });
};
