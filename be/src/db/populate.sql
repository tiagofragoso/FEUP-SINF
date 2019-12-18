---------------------
-- Warehouse Zones --
---------------------

insert into warehouse_zones(id, x, y) values("01", 0, 1);
insert into warehouse_zones(id, x, y) values("PERC", 2, 0);
insert into warehouse_zones(id, x, y) values("STRINGS", 4, 0);
insert into warehouse_zones(id, x, y) values("BRASS", 6, 0);
insert into warehouse_zones(id, x, y) values("WOODWINDS", 2, 2);
insert into warehouse_zones(id, x, y) values("KEYBOARDS", 4, 2);
insert into warehouse_zones(id, x, y) values("OTHER", 6, 2);
insert into warehouse_zones(id, x, y) values("EXIT", 8, 1);

-------------------
-- Picking Waves --
-------------------

insert into picking_waves(name, due_date, is_done) values("PickingWave01", "22-12-2019", "true");
insert into picking_waves(name, due_date, is_done) values("PickingWave02", "23-12-2019", "true");

-----------
-- Items --
-----------

insert into items(item_key, picking_wave_id, sales_order, name, quantity, is_picked) values("TAMBOURINE", 1, "ECL.2019.9", "Tambourine", 3, "true");
insert into items(item_key, picking_wave_id, sales_order, name, quantity, is_picked) values("PIANO", 1, "ECL.2019.11", "Piano", 1, "true");
insert into items(item_key, picking_wave_id, sales_order, name, quantity, is_picked) values("MODERN_OBOE", 1, "ECL.2019.3", "Modern Oboe", 1, "true");

insert into items(item_key, picking_wave_id, sales_order, name, quantity, is_picked) values("TAMBOURINE", 2, "ECL.2019.9", "Tambourine", 2, "true");
insert into items(item_key, picking_wave_id, sales_order, name, quantity, is_picked) values("PT_GUITAR", 2, "ECL.2019.4", "Portuguese Guitar", 3, "true");



