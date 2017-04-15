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
      }).then(function(messages) {
        console.log('MESSAGES===================================>>>>>>>', messages);
      })
    }, // a function which produces all the messages
    post: function () {
      var connection;

      mysqlP.createConnection({
        user: 'root',
        password: '',
        database: 'chat'
      }).then(function(conn) {
        connection = conn;

        return connection.query('SQL syntax here')
      })
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (user) {
      var connection;

      mysqlP.createConnection({
        user: 'root',
        password: '',
        database: 'chat'
      }).then(function(conn) {
        connection = conn;

        return connection.query('INSERT IGNORE INTO `users`SET `name` = ?;', user);
      }).then(function(data) {
        console.log('THIS IS THE DATA FROM THE USER POST METHOD, WHO KNOWS WHAT WE NEED TO DO, WE DONT', data);
      })
    }
  }
};

