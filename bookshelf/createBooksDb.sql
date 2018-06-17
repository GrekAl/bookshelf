CREATE SCHEMA IF NOT EXISTS bookshelf;
CREATE TABLE bookshelf.users (id serial NOT NULL,
 login VARCHAR(60) NOT NULL,
 password VARCHAR(60) NOT NULL,
 isadmin int NOT NULL DEFAULT 0, 
PRIMARY KEY (id),
UNIQUE   (id));

CREATE TABLE bookshelf.books (id serial NOT NULL,
 title TEXT NOT NULL,
 author TEXT NOT NULL,
 publisher TEXT NOT NULL,
 theme TEXT NOT NULL,
 isbn CHAR(17),
PRIMARY KEY (id),
UNIQUE   (id));

INSERT INTO bookshelf.users (login, password) VALUES ('user', '$2a$04$q9FmeT/NPNKlWd.E/m29eerGGjgsyFXh2LTFl73Ekhjd6tSgTPZl6');
INSERT INTO bookshelf.users (login, password, isadmin) VALUES ('admin', '$2a$04$SbbAKjmHK./Ws1hwkLtYV.CPxPv/Pu53ZjrbF2x3DI4sG6KeIKXGG', '1');

