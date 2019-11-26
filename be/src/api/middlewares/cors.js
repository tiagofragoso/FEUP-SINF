module.exports = () => (_, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");

    next();
};
