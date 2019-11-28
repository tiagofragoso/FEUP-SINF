insert into picking_waves(name, due_date) values("a_picking_wave", "10-09-2019");
insert into picking_waves(name, due_date) values("another_picking_wave", "12-10-2018");

insert into items(item_key, picking_wave, sales_order, name) values("F2H77", 1, "46B", "Drums");
insert into items(item_key, picking_wave, sales_order, name, quantity) values("C6B00", 2, "11C", "Pan Flute", 7);
insert into items(item_key, picking_wave, sales_order, name, quantity) values("D00A1", 1, "11C", "Guitar", 2);