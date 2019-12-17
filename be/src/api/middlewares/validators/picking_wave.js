const { body, param } = require("express-validator");
const picking_wave = require("../../../models/picking_wave");

const { useExpressValidators } = require("../errorHandler");

const create = useExpressValidators([
    body("name")
        .exists().withMessage("Picking Wave name must be provided").bail()
        .isString().withMessage("Picking Wave name must be a String"),

    body("due_date")
        .exists().withMessage("Picking Wave due data must be provided").bail()
        .isString().withMessage("Picking Wave due date must be a String"),
]);

const get = useExpressValidators([
    param("id")
        .exists().withMessage("Picking Wave ID must be specified").bail()
        .isInt().withMessage("Picking Wave ID must be an Integer")
        .toInt(),
]);

const addItems = useExpressValidators([
    param("id")
        .exists().withMessage("Picking Wave ID must be specified").bail()
        .isInt().withMessage("Picking Wave ID must be an Integer")
        .toInt(),

    body("items")
        .exists().withMessage("Items must be specified").bail()
        .isArray({ min: 1 }).withMessage("At least 1 item should be provided"),

    body("items.*.item_key")
        .exists().withMessage("Item Key must be specified").bail()
        .isString().withMessage("Item Key must be a String"),

    body("items.*.sales_order")
        .exists().withMessage("Sales Order ID must be specified").bail()
        .isString().withMessage("Sales Order ID must be a String"),

    body("items.*.name")
        .exists().withMessage("Item Name must be specified").bail()
        .isString().withMessage("Item Name must be a String"),

    body("items.*.quantity")
        .exists().withMessage("Item Quantity must be specified").bail()
        .isInt({
            min: 0,
        }).withMessage("Quantity must be a positive Integer")
        .toInt(),
]);

const exists = async (req, res, next) => {
    const { id } = req.params;

    const pwave = await picking_wave.findByPk(parseInt(id, 10));
    if (!pwave) {
        return res.status(404).send();
    }

    if (!req.locals) {
        req.locals = {};
    }
    req.locals.pwave = pwave;

    return next();
};

module.exports = {
    create,
    get,
    addItems,
    exists,
};
