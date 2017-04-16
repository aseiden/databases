var models = require('../models');
var mysql = require('mysql');
var Promise = require("bluebird");

module.exports = {
  messages: {
    get: function (req, res) {
      //retrieve messages from database

      //populate body of response w/ messages
      //send response
      models.messages.get().then(function(data) { //object
        res.status(200).send(data);
        // for (var key in data[0]) {
        //   console.log('THIS IS THE MESSAGE GET DATA:', key, data[0][key]);
        // }
      })
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('THIS BE DA BODY WE ARE LOOKING FOR', req.body, typeof req.body);
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
