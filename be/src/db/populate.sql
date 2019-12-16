-------------------
-- Picking Waves --
-------------------

insert into picking_waves(name, due_date) values("OPorto Music Shop", "22-12-2019T12:00");

-----------
-- Items --
-----------

insert into items(item_key, picking_wave_id, sales_order, name) values("F2H77", 1, "46B", "Drums");
insert into items(item_key, picking_wave_id, sales_order, name, quantity) values("D00A1", 1, "11C", "Guitar", 2);
insert into items(item_key, picking_wave_id, sales_order, name, quantity, is_picked) values("E11C3", 1, "11D", "Piano", 5, "true");
insert into items(item_key, picking_wave_id, sales_order, name, quantity) values("E02Z1", 1, "11C", "Violin", 2);
insert into items(item_key, picking_wave_id, sales_order, name, quantity) values("F03X5", 1, "11C", "Viola", 3);
insert into items(item_key, picking_wave_id, sales_order, name, quantity) values("G04Y6", 1, "12D", "Cello", 4);
insert into items(item_key, picking_wave_id, sales_order, name, quantity, is_picked) values("H05W7", 1, "13E", "Double-Bass", 1, "true");

insert into items(item_key, picking_wave_id, sales_order, name, quantity) values("C6B00", 2, "15F", "Pan Flute", 7);
insert into items(item_key, picking_wave_id, sales_order, name, quantity) values("I06K4", 2, "16G", "Bass", 2);
insert into items(item_key, picking_wave_id, sales_order, name, quantity) values("J07L5", 2, "17H", "Mandolin", 1);
insert into items(item_key, picking_wave_id, sales_order, name, quantity, is_picked) values("K23A0", 2, "18I", "Banjo", 3, "true");
insert into items(item_key, picking_wave_id, sales_order, name, quantity, is_picked) values("L24B7", 2, "19J", "12-String Guitar", 13, "true");

insert into items(item_key, picking_wave_id, sales_order, name, quantity, is_picked) values("O16P5", 3, "20K", "Clarinet", 7, "true");
insert into items(item_key, picking_wave_id, sales_order, name, quantity, is_picked) values("P27K6", 3, "21L", "Harmonica", 2, "true");
insert into items(item_key, picking_wave_id, sales_order, name, quantity, is_picked) values("Q38L7", 3, "22M", "Trombone", 1, "true");
insert into items(item_key, picking_wave_id, sales_order, name, quantity, is_picked) values("V49A8", 3, "23N", "Saxophone", 3, "true");
insert into items(item_key, picking_wave_id, sales_order, name, quantity, is_picked) values("N50B9", 3, "24O", "Trumpet", 13, "true");

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
