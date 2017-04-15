var db = require('../db');
var Promise = require("bluebird");
var mysql = require('mysql');
var mysqlP = require('promise-mysql');

module.exports = {
  messages: {
    get: function () {
      var connection;

      return mysqlP.createConnection({
        user: 'root',
        password: '',
        database: 'chat'
      }).then(function(conn) {
        connection = conn;

        return connection.query(`
          SELECT messages.message, rooms.name as roomname, users.name as username
          FROM messages, users, rooms
          WHERE messages.id_users = users.id and
          messages.id_rooms = rooms.id;
        `);
      })
    }, // a function which produces all the messages
    post: function (fullMessage) {
      var connection;
      console.log()

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
        ).then(function(data) {
          console.log('DATADATATATATATATAT: ', data);
        })
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
      })
    }
  }
};
