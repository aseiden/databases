var models = require('../models');
var mysql = require('mysql');
var Promise = require("bluebird");

module.exports = {
  messages: {
    get: function (req, res) {
      // input: get to this endpoint (whic is already sorted by the time this line runs)
      // ouput: response with all messages in the body

      // Step 1: access all messages
      // step 2: write messages to the response body
      // step 3: return the response
      var messages = models.messages.get();
      res.end();
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('THIS IS THE BODY OF THE MESSAGE POST REQUEST:', req.body);
      //extract data
      //update rooms, users table
      //req.body.username, req.body.room, insert these values into respective table
      models.users.post(req.body.username).then(function() {
        return models.rooms.post(req.body.roomname);
      }).then(function() {
        return models.messages.post(req.body);
      });


      res.end();
    } // a function which handles posting a message to the database
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
