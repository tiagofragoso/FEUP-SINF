const item = require("../../../models/item");

const isUnique = async (req, res, next) => {
    const { item_key } = req.body;

    const i = await item.findByPk(item_key);
    if (i) {
        return res.status(400).json({
            reason: "Item already exists",
        });
    }

    return next();
};

module.exports = {
    isUnique,
};
