-- create the table to hold the information --
CREATE TABLE "koala_holla"(
	"id" serial primary key,
	"name" varchar(27) NOT NULL,
	"gender" varchar(1),
	"age" int,
	"ready_for_transfer" boolean,
	"notes" varchar(255)
);

--populate the table with data--
INSERT INTO koala_holla (id, "name", gender, age, ready_for_transfer, notes)
VALUES (1, 'Scotty', 'M', 4, 'Y', 'Born in Guatemala'),
(2, 'Jean', 'F', 5, 'Y', 'Allergic to lots of lava'),
(3, 'Ororo', 'F', 7, 'N', 'Loves listening to Paula (Abdul)'),
(4, 'Logan', 'M', 15, 'N', 'Loves the sauna'),
(5, 'Charlie', 'M', 9, 'Y', 'Favorite band is Nirvana'),
(6, 'Betsy', 'F', 4, 'Y', 'Has a pet iguana');
