const { Router } = require("express");
const router = Router();
const warehouse_zone = require("../../models/warehouse_zone");
const { flattenQueryResults } = require("../../utils");
const warehouse_zone_validators = require("../middlewares/validators/warehouse_zone");
const { getPickingWavePath } = require("../../lib/path");

module.exports = (app) => {
    app.use("/warehouse-zone", router);

    /**
     * Gets all the Warehouse Zones
     */
    router.get("/", async (_, res) => {
        const warehouse_zones = await warehouse_zone.findAll();

        return res.json(flattenQueryResults(warehouse_zones));
    });

    /**
     * Gets Warehouse Zone information
     */
    router.get("/:id", warehouse_zone_validators.get, warehouse_zone_validators.exists, (req, res) => {
        const { w } = req.locals;

        return res.json(w);
    });

    /**
     * Creates a new Warehouse Zone
     */
    router.post("/", warehouse_zone_validators.create, warehouse_zone_validators.isUnique, async (req, res) => {
        const { id, x, y } = req.body;

        await warehouse_zone.create(
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

    /**
     * Gets Warehouse Zones visit path
     */
    router.get("/path/calculate", warehouse_zone_validators.path, warehouse_zone_validators.allExist, (req, res) => {
        const { warehouse_zones } = req.locals;

        const path = getPickingWavePath([...warehouse_zones]);

        return res.json({
            path,
        });
    });
};
