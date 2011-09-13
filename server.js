var express  = require('express')
  , form     = require('connect-form')
  , _        = require('underscore')
  , app      = express.createServer(form({ keepExtensions: true }))
  , io       = require('socket.io').listen(app)
  , cfg      = require('./cfg/server')
  , channels = {}
  ;

app.listen(cfg.port);

function email_route(request, response) {
  request.form.complete( function(errors, fields, files){
    if (errors) { return next(errors); }

    var email_address = encodeURIComponent(fields.to)
      , subscribers   = channels[email_address]
      , parts
      ;

    if(subscribers) {
      parts = _.map(_.keys(fields), 
        function (k) { 
          var encoded_field = fields[k].replace(/"/g, '\\"').replace(/'/g, '"');
          return "-F '" + k + '=' + encoded_field  + "'";
      }).join(' ');
      subscribers.emit('email', parts);
      response.send('{ok: true}', 201); 
    }
    else {
      response.send('{reason: "No subscribers", error: "no_subscribers"}', 200);
    }
  });
}

function app_route(request,response) {
  response.sendfile(__dirname + '/index.html');
}

app.post('/', email_route);
app.get('/', app_route);

function connect_hook (channel_name) {
  return function () { console.log('user connected to ' + channel_name); };
}

io.sockets
  .on('connection', function(socket) {
    socket.on('subscribe', function(channel_name,cb) {
      channel_name = encodeURIComponent(channel_name);
      var channel = io
            .of('/' + channel_name)
            .on('connection', connect_hook(channel_name));
      channels[channel_name] = channel;
      cb('/' + channel_name);
    });
  });