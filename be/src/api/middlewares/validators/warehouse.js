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

const exists = async (req, res, next) => {
    const { id } = req.params;

    const w = await warehouse.findByPk(id);
    if (!w) {
        return res.status(404).send();
    }

    req.locals = { w };

    return next();
};

const isUnique = async (req, res, next) => {
    const { id } = req.body;

    const w = await warehouse.findByPk(id);
    if (w) {
        return res.status(400).send("Warehouse already exists");
    }

    return next();
};

module.exports = {
    get,
    create,
    exists,
    isUnique,
};
