'use strict';
// Pubnub service configuration
// ===========================

var PubNub = require('pubnub');

var pubnub = new PubNub({
            publishKey : 'pub-c-00f41514-cf7f-4af7-a7fd-ab292bd550b7',
            subscribeKey : 'sub-c-bffa96c2-0283-11e7-8ce0-0619f8945a4f',
            secretKey: "sec-c-ODdmOTVkNzUtMGU2OS00MGEyLWI0YWQtYzU0NDJjNTA3YWFl",
            ssl: true
});



module.exports = {
  publish: function(channel, message){
    pubnub.publish({
             channel: channel,
             message: JSON.stringify(message)},
             function(status, response) {
               if (status.error) {
                 console.log(status)
               } else {
                 console.log("message Published w/ timetoken", response.timetoken)
               }
             });
  },
  subscribe: function(channel, callback){

    pubnub.addListener({

        message: function(m) {
            // handle message

            var msg = m.message; // The Payload

            callback(msg);
            }
  });
    // Subscribe to the demo_tutorial channel
    pubnub.subscribe({
        channels: [channel]
    });
  }
}