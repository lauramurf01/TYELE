var api_key = 'key-7ae04cdb7d7859b65d6fa35203bc8c2b';
var domain = 'sandboxd01531df3f224b37bd627491b7a03d6a.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
var contactEvent = require('./events');

var  messageHandler = function(m) {
         // The Payload
        var data = {
            from: 'Coláiste Bríde  <administrator@cb.ie>',
            to: JSON.parse(m).email,
            subject: 'Upcoming events',
            text: 'Dont forget about the upcoming event on the ... Please bring a change of clothes. Thank you.'
          };

          mailgun.messages().send(data, function (error, body) {
            console.log(body);
          });
        }

contactEvent.subscribe('create_student_event', messageHandler)