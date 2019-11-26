insert into picking_waves(name, due_date) values("a_picking_wave", "10-09-2019");
insert into picking_waves(name, due_date) values("another_picking_wave", "12-10-2018");

insert into items(item_key, picking_wave, sales_order, name, warehouse) values("F2H77", 1, "46B", "Drums", "A02");
insert into items(item_key, picking_wave, sales_order, name, warehouse, quantity) values("C6B00", 2, "11C", "Pan Flute", "A01", 7);
insert into items(item_key, picking_wave, sales_order, name, warehouse, quantity) values("D00A1", 1, "11C", "Guitar", "A03", 2);