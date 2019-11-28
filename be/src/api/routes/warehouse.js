const { Router } = require("express");
const router = Router();
const warehouse = require("../../models/warehouse");
const { flattenQueryResults } = require("../../utils");
const warehouse_validators = require("../middlewares/validators/warehouse");

module.exports = (app) => {
    app.use("/warehouse", router);

    /**
     * Gets all the Warehouses
     */
    router.get("/", async (_, res) => {
        const warehouses = await warehouse.findAll();

        return res.json(flattenQueryResults(warehouses));
    });

    /**
     * Gets Warehouse information
     */
    router.get("/:id", warehouse_validators.get, warehouse_validators.exists, (req, res) => {
        const { w } = req.locals;

        return res.json(w);
    });

    /**
     * Creates a new Warehouse
     */
    router.post("/", warehouse_validators.create, async (req, res) => {
        const { id, x, y } = req.body;

        await warehouse.create(
            {
                id,
                x,
                y,
            },
            {
                fields: ["id", "x", "y"],
            },
        );

        return res.status(201).send();
    });
};
