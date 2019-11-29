const flattenQueryResults = (results) => (
    results.map(({ dataValues }) => dataValues)
);

module.exports = {
    flattenQueryResults,
}
;
