module.exports = () => (_, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "*");
    res.set("Access-Control-Allow-Headers", "*");

    return next();
};
