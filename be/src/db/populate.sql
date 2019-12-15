insert into picking_waves(name, due_date) values("OPorto Music Shop", "22-12-2019");
insert into picking_waves(name, due_date) values("Musicarte", "23-12-2019");
insert into picking_waves(name, due_date, is_done) values("Lisbon Music", "23-12-2019", "true");
insert into picking_waves(name, due_date) values("Leiria Sounds", "28-12-2019");

insert into items(item_key, picking_wave, sales_order, name) values("F2H77", 1, "46B", "Drums");
insert into items(item_key, picking_wave, sales_order, name, quantity) values("D00A1", 1, "11C", "Guitar", 2);
insert into items(item_key, picking_wave, sales_order, name, quantity, is_picked) values("E11C3", 1, "11D", "Piano", 5, "true");
insert into items(item_key, picking_wave, sales_order, name, quantity) values("E02Z1", 1, "11C", "Violin", 2);
insert into items(item_key, picking_wave, sales_order, name, quantity) values("F03X5", 1, "11C", "Viola", 3);
insert into items(item_key, picking_wave, sales_order, name, quantity) values("G04Y6", 1, "12D", "Cello", 4);
insert into items(item_key, picking_wave, sales_order, name, quantity, is_picked) values("H05W7", 1, "13E", "Double-Bass", 1, "true");

insert into items(item_key, picking_wave, sales_order, name, quantity) values("C6B00", 2, "15F", "Pan Flute", 7);
insert into items(item_key, picking_wave, sales_order, name, quantity) values("I06K4", 2, "16G", "Bass", 2);
insert into items(item_key, picking_wave, sales_order, name, quantity) values("J07L5", 2, "17H", "Mandolin", 1);
insert into items(item_key, picking_wave, sales_order, name, quantity, is_picked) values("K23A0", 2, "18I", "Banjo", 3, "true");
insert into items(item_key, picking_wave, sales_order, name, quantity, is_picked) values("L24B7", 2, "19J", "12-String Guitar", 13, "true");

insert into items(item_key, picking_wave, sales_order, name, quantity, is_picked) values("O16P5", 3, "20K", "Clarinet", 7, "true");
insert into items(item_key, picking_wave, sales_order, name, quantity, is_picked) values("P27K6", 3, "21L", "Harmonica", 2, "true");
insert into items(item_key, picking_wave, sales_order, name, quantity, is_picked) values("Q38L7", 3, "22M", "Trombone", 1, "true");
insert into items(item_key, picking_wave, sales_order, name, quantity, is_picked) values("V49A8", 3, "23N", "Saxophone", 3, "true");
insert into items(item_key, picking_wave, sales_order, name, quantity, is_picked) values("N50B9", 3, "24O", "Trumpet", 13, "true");


insert into warehouse_zones(id, x, y) values("A00", 2, 0);
insert into warehouse_zones(id, x, y) values("A01", -1, 0);
insert into warehouse_zones(id, x, y) values("A02", 3, 3);
insert into warehouse_zones(id, x, y) values("A03", 4, 5);
insert into warehouse_zones(id, x, y) values("A04", 7, 6);