const { body, param } = require("express-validator");

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

module.exports = {
    create,
    get,
};
