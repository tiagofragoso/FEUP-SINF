const { param } = require("express-validator");

const { useExpressValidators } = require("../errorHandler");

const get = useExpressValidators([
    param("id")
        .exists().withMessage("Sales Order ID must be specified").bail()
        .isString().withMessage("Sales Order ID must be a String"),
]);

module.exports = {
    get,
};
