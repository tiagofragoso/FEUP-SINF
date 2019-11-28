PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

DROP TABLE IF EXISTS picking_waves;
CREATE TABLE picking_waves (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    due_date DATE NOT NULL,
    is_done BOOLEAN NOT NULL DEFAULT false
);

DROP TABLE IF EXISTS items;
CREATE TABLE items (
    item_key TEXT PRIMARY KEY,
    picking_wave REFERENCES picking_waves (id) NOT NULL,
    sales_order TEXT NOT NULL,
    name TEXT NOT NULL,
    quantity INT NOT NULL CHECK (quantity >= 0) DEFAULT 0
);

DROP TABLE IF EXISTS warehouses;
CREATE TABLE warehouses (
    id TEXT PRIMARY KEY,
    x INTEGER NOT NULL,
    y INTEGER NOT NULL
);

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
