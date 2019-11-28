const getPickingWavePath = (warehouses) => {
    const path = [];

    // Path starts with the warehouse closest to origin [0, 0] (which represents the warehouse entry point)
    const closest_to_origin_index = getClosestWarehouseIndex({ x: 0, y: 0 }, warehouses);
    path.push(warehouses.splice(closest_to_origin_index, 1)[0]);

    while (warehouses.length > 0) {
        const closest_index = getClosestWarehouseIndex(path[path.length - 1], warehouses);
        path.push(warehouses.splice(closest_index, 1)[0]);
    }

    return path;
};

const getClosestWarehouseIndex = (origin, others) => {
    let closest_index = 0;
    let closest_distance = distance(origin, others[0]);

    for (let i = 1; i < others.length; ++i) {
        const current_distance = distance(origin, others[i]);
        if (current_distance < closest_distance) {
            closest_distance = current_distance;
            closest_index = i;
        }
    }

    return closest_index;
};

const distance = (w1, w2) => (
    Math.sqrt(Math.pow(w1.x - w2.x, 2) + (w1.y - w2.y, 2))
);

module.exports = {
    getPickingWavePath,
};
