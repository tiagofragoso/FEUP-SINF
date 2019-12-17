PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

DROP TABLE IF EXISTS picking_waves;
CREATE TABLE picking_waves (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    due_date DATETIME NOT NULL,
    is_done BOOLEAN NOT NULL DEFAULT false
);

DROP TABLE IF EXISTS items;
CREATE TABLE items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_key TEXT NOT NULL,
    picking_wave_id REFERENCES picking_waves (id) NOT NULL,
    sales_order TEXT NOT NULL,
    name TEXT NOT NULL,
    quantity INT NOT NULL CHECK (quantity >= 0) DEFAULT 0,
    is_picked BOOLEAN NOT NULL DEFAULT false
);

DROP TABLE IF EXISTS warehouse_zones;
CREATE TABLE warehouse_zones (
    id TEXT PRIMARY KEY,
    x INTEGER NOT NULL,
    y INTEGER NOT NULL
);

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
