var db = require('../db');
var Promise = require("bluebird");
var mysql = require('mysql');
var mysqlP = require('promise-mysql');

module.exports = {
  messages: {
    get: function () {
      var connection;

      mysqlP.createConnection({
        user: 'root',
        password: '',
        database: 'chat'
      }).then(function(conn) {
        connection = conn;

        return connection.query('select * from messages;');
      })
    }, // a function which produces all the messages
    post: function (fullMessage) {
      var connection;

      mysqlP.createConnection({
        user: 'root',
        password: '',
        database: 'chat'
      }).then(function(conn) {
        connection = conn;
        return connection.query(
          `
          INSERT INTO messages
            (message, id_users, id_rooms)
          SELECT "${fullMessage.message}",
            u.id,
              (SELECT r.id
                FROM rooms r
                WHERE r.name = "${fullMessage.roomname}")
            FROM users u
            WHERE u.name = "${fullMessage.username}"
          `
        // `INSERT INTO messages
        // SET message = "${fullMessage.message}",
        //   id_users = (
        //     SELECT id
        //     FROM users
        //     WHERE name = "${fullMessage.username}"
        //   ),
        //   id_rooms = (
        //     SELECT id
        //     FROM rooms
        //     WHERE name = "${fullMessage.roomname}"
        //   )
        // `
        )
      })
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {
      //

    },
    post: function (user) {
      var connection;

      return mysqlP.createConnection({
        user: 'root',
        password: '',
        database: 'chat'
      }).then(function(conn) {
        connection = conn;

        return connection.query('INSERT IGNORE INTO `users` SET `name` = ?;', user);
      })
    }
  },

  rooms: {
    // Ditto as above.
    get: function () {
      //

    },
    post: function (room) {
      var connection;

      return mysqlP.createConnection({
        user: 'root',
        password: '',
        database: 'chat'
      }).then(function(conn) {
        connection = conn;

        return connection.query('INSERT IGNORE INTO `rooms` SET `name` = ?;', room);
      }).then(function(data) {
        console.log('THIS IS THE DATA FROM THE room POST METHOD, WHO KNOWS WHAT WE NEED TO DO, WE DONT', data);
      })
    }
  }
};
