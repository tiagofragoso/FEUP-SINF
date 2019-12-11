insert into picking_waves(name, due_date) values("a_picking_wave", "10-09-2019");
insert into picking_waves(name, due_date) values("another_picking_wave", "12-10-2018");
insert into picking_waves(name, due_date, is_done) values("done_picking_wave", "15-11-2018", "true");

insert into items(item_key, picking_wave, sales_order, name) values("F2H77", 1, "46B", "Drums");
insert into items(item_key, picking_wave, sales_order, name, quantity) values("D00A1", 1, "11C", "Guitar", 2);
insert into items(item_key, picking_wave, sales_order, name, quantity, is_picked) values("E11C3", 1, "11D", "Piano", 5, "true");
insert into items(item_key, picking_wave, sales_order, name, quantity) values("E02Z1", 1, "11C", "Violin", 2);
insert into items(item_key, picking_wave, sales_order, name, quantity) values("F03X5", 1, "11C", "Viola", 3);
insert into items(item_key, picking_wave, sales_order, name, quantity) values("G04Y6", 1, "12D", "Cello", 4);
insert into items(item_key, picking_wave, sales_order, name, quantity, is_picked) values("H05W7", 1, "13E", "Double-Bass", 1, "true");
insert into items(item_key, picking_wave, sales_order, name, quantity) values("C6B00", 2, "14F", "Pan Flute", 7);
insert into items(item_key, picking_wave, sales_order, name, quantity) values("I06K4", 2, "14F", "Bass", 2);
insert into items(item_key, picking_wave, sales_order, name, quantity) values("J07L5", 2, "14F", "Mandolin", 1);
insert into items(item_key, picking_wave, sales_order, name, quantity, is_picked) values("K23A0", 2, "14F", "Banjo", 3, "true");
insert into items(item_key, picking_wave, sales_order, name, quantity, is_picked) values("L24B7", 2, "14F", "12-String Guitar", 13, "true");


insert into warehouse_zones(id, x, y) values("A00", 2, 0);
insert into warehouse_zones(id, x, y) values("A01", -1, 0);
insert into warehouse_zones(id, x, y) values("A02", 3, 3);
insert into warehouse_zones(id, x, y) values("A03", 4, 5);
insert into warehouse_zones(id, x, y) values("A04", 7, 6);