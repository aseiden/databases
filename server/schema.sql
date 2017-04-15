CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL UNIQUE
);

CREATE TABLE rooms (
  id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL UNIQUE
);

CREATE TABLE messages (
  id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  message TEXT NOT NULL,
  id_users INTEGER NOT NULL,
  id_rooms INTEGER NOT NULL,
  FOREIGN KEY (id_users) REFERENCES users(id),
  FOREIGN KEY (id_rooms) REFERENCES rooms(id)
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

