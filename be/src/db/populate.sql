-------------------
-- Picking Waves --
-------------------

insert into picking_waves(name, due_date) values("OPorto Music Shop", "22-12-2019");
insert into picking_waves(name, due_date) values("Musicarte", "23-12-2019");
insert into picking_waves(name, due_date, is_done) values("Lisbon Music", "23-12-2019", "true");
insert into picking_waves(name, due_date) values("Leiria Sounds", "28-12-2019");

-----------
-- Items --
-----------

insert into items(item_key, picking_wave, sales_order, name, quantity) values("YAMAHA_YCL-457II-22", 1, "46B", "Yamaha YCL 457II-22 Clarinet", 1);
insert into items(item_key, picking_wave, sales_order, name, quantity) values("MODERN_OBOE", 1, "11C", "Modern Oboe", 2);
insert into items(item_key, picking_wave, sales_order, name, quantity, is_picked) values("PT_GUITAR", 1, "11D", "Portuguese Guitar", 3, "true");

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
