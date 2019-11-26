const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const router = Router();
const picking_wave = require("../../models/picking_wave");
const item = require("../../models/item");

module.exports = (app) => {
    app.use("/picking-wave", router);

    /**
     * Gets all the picking waves
     * @returns {200} Success
     * @returns {500} Internal Error
     */
    router.get("/", (_, res) => {
        picking_wave.findAll()
            .then((query_res) => {
                const picking_waves = query_res.map(({ dataValues }) => dataValues);
                res.json(picking_waves);
            })
            .catch(() => {
                res.status(500).send("Failure");
            });
    });

    /**
     * Gets all items in a picking wave
     * @param {Integer} id Picking wave id
     * @returns {200} Success
     * @returns {400} Bad Request
     * @returns {500} Internal Error
     */
    router.get("/:id", (req, res) => {
        const { id } = req.params;

        if (isNaN(id)) {
            res.status(400);
            res.send("The picking order id must be an Integer");
            return;
        }

        item.findAll({
            where: {
                picking_wave: parseInt(id, 10),
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
    ], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422);
            res.json(errors.array());
            return;
        }

        picking_wave.create(
            {
                name: req.body.name,
                due_date: req.body.due_date,
            },
            {
                fields: ["name", "due_date"],
            },
        )
            .then(() => res.status(201).send())
            .catch(() => res.status(500).send("Failure"));
    });
};
