const warehouse = require("../../../models/warehouse");
const { body, param } = require("express-validator");

const { useExpressValidators } = require("../errorHandler");

const get = useExpressValidators([
    param("id")
        .exists().withMessage("Warehouse ID must be specified").bail()
        .isString().withMessage("Warehouse ID must be a String"),
]);

const create = useExpressValidators([
    body("id")
        .exists().withMessage("Warehouse ID must be specified").bail()
        .isString().withMessage("Warehouse ID must be a String"),

    body("x")
        .exists().withMessage("Warehouse x position must be specified").bail()
        .isInt().withMessage("Warehouse x position must be an Integer")
        .toInt(),

    body("y")
        .exists().withMessage("Warehouse y position must be specified").bail()
        .isInt().withMessage("Warehouse y position must be an Integer")
        .toInt(),
]);

const path = useExpressValidators([
    body("warehouses")
        .exists().withMessage("Warehouses must be specified").bail()
        .isArray({
            min: 1,
        }).withMessage("Warehouses must be a non-empty Array"),
]);

const exists = async (req, res, next) => {
    const { id } = req.params;

    const w = await warehouse.findByPk(id);
    if (!w) {
        return res.status(404).send();
    }

    req.locals = { w };

    return next();
};

const allExist = async (req, res, next) => {
    const { warehouses } = req.body;

    req.locals = req.locals || {};
    req.locals.warehouses = [];

    for (const warehouse_id of warehouses) {
        const w = await warehouse.findByPk(warehouse_id);
        if (!w) {
            return res.status(404).json({
                reason: `Warehouse ${warehouse_id} does not exist`,
            });
        }
        req.locals.warehouses.push(w.dataValues);
    }

    return next();
};

const isUnique = async (req, res, next) => {
    const { id } = req.body;

    const w = await warehouse.findByPk(id);
    if (w) {
        return res.status(400).json({
            reason: "Warehouse already exists",
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
