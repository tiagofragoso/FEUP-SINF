const warehouse_zone = require("../../../models/warehouse_zone");
const { body, param } = require("express-validator");

const { useExpressValidators } = require("../errorHandler");

const get = useExpressValidators([
    param("id")
        .exists().withMessage("Warehouse Zone ID must be specified").bail()
        .isString().withMessage("Warehouse Zone ID must be a String"),
]);

const create = useExpressValidators([
    body("id")
        .exists().withMessage("Warehouse Zone ID must be specified").bail()
        .isString().withMessage("Warehouse Zone ID must be a String"),

    body("x")
        .exists().withMessage("Warehouse Zone x position must be specified").bail()
        .isInt().withMessage("Warehouse Zone x position must be an Integer")
        .toInt(),

    body("y")
        .exists().withMessage("Warehouse Zone y position must be specified").bail()
        .isInt().withMessage("Warehouse Zone y position must be an Integer")
        .toInt(),
]);

const path = useExpressValidators([
    param("zones")
        .exists().withMessage("zones must be specified").bail()
        .customSanitizer((val) => val.split(","))
        .isArray({
            min: 1,
        }).withMessage("zones must be a non-empty Array"),
]);

const exists = async (req, res, next) => {
    const { id } = req.params;

    const w = await warehouse_zone.findByPk(id);
    if (!w) {
        return res.status(404).send();
    }

    req.locals = { w };

    return next();
};

const allExist = async (req, res, next) => {
    const { zones } = req.params;

    req.locals = req.locals || {};
    req.locals.zones = [];

    for (const warehouse_zone_id of zones) {
        const w = await warehouse_zone.findByPk(warehouse_zone_id);
        if (!w) {
            return res.status(400).json({
                reason: `Warehouse Zone ${warehouse_zone_id} does not exist`,
            });
        }
        req.locals.zones.push(w.dataValues);
    }

    return next();
};

const isUnique = async (req, res, next) => {
    const { id } = req.body;

    const w = await warehouse_zone.findByPk(id);
    if (w) {
        return res.status(400).json({
            reason: "Warehouse Zone already exists",
        });
    }

    return next();
};

module.exports = {
    get,
    create,
    exists,
    isUnique,
    path,
    allExist,
};
