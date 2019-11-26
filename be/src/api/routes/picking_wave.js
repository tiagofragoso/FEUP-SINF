const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const router = Router();
const picking_wave = require("../../models/picking_wave");
const item = require("../../models/item");
const { flattenQueryResults } = require("../../utils");

module.exports = (app) => {
    app.use("/picking-wave", router);

    /**
     * Gets all the picking waves
     * @returns {200} Success
     * @returns {500} Internal Error
     */
    router.get("/", async (_, res) => {
        const picking_waves = await picking_wave.findAll();

        return res.json(flattenQueryResults(picking_waves));
    });

    /**
     * Gets all items in a picking wave
     * @param {Integer} id Picking wave id
     * @returns {200} Success
     * @returns {400} Bad Request
     * @returns {500} Internal Error
     */
    router.get("/:id", async (req, res) => {
        const { id } = req.params;

        if (isNaN(id)) {
            return res
                .status(400)
                .send("The picking order id must be an Integer");
        }

        const items = await item.findAll({
            where: {
                picking_wave: parseInt(id, 10),
            },
        });

        return res.json(flattenQueryResults(items));
    });

    /**
     * Creates a new picking wave
     * @param {String} name Picking Wave name
     * @param {String} due_date Picking Wave due date
     * @returns {201} Created
     * @returns {422} Unprocessable Entity
     * @returns {500} Internal Error
     */
    router.post("/", [
        check("name", "Picking Wave name is mandatory").not().isEmpty(),
        check("due_date", "Picking Wave due date is mandatory").not().isEmpty(),
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(422)
                .json(errors.array());
        }

        await picking_wave.create(
            {
                name: req.body.name,
                due_date: req.body.due_date,
            },
            {
                fields: ["name", "due_date"],
            },
        );

        return res.status(201).send();
    });
};
