var models = require('../models');
var mysql = require('mysql');
var Promise = require("bluebird");

module.exports = {
  messages: {
    get: function (req, res) {
      var messages = models.messages.get();
      res.end();
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.users.post(req.body.username).then(function() {
        return models.rooms.post(req.body.roomname);
      }).then(function() {
        return models.messages.post(req.body);
      }).then(function() {
        res.end();
      });
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log('THIS IS THE USERS GET REQUEST:', req)

      res.end();
    },
    post: function (req, res) {
      models.users.post(req.body.username);
      res.end();
    }
  }


};
