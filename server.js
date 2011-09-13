var express  = require('express')
  , app      = express.createServer()
  , io       = require('socket.io').listen(app)
  , cfg      = require('./cfg/server')
  , channels = {}
  ;

app.configure( function () { app.use(express.bodyParser()); });
app.listen(cfg.port);

// { "address_id": 1920
// , "created_at": "2011-09-12T06:06:34-07:00"
// , "from": "Nuno.Job@marklogic.com"
// , "mid": "CA93C11F.A951%nuno@marklogic.com"
// , "size":5215
// , "status": "500"
// , "subject": "Testing"
// , "to": "282f057bb3b492d36e03@cloudmailin.net"}
function email_route(request, response) {
  var parsed        = request.body
    , email_address = parsed.to
    , subscribers   = channels[email_address]
    ;

  if(subscribers) {
    subscribers.emit('email', parsed);
    response.send('{ok: true}', 201); 
  }
  else {
    response.send('{reason: "No subscribers", error: "no_subscribers"}', 200);
  }
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
      var channel = io
            .of('/' + channel_name)
            .on('connection', connect_hook(channel_name));
      channels[channel_name] = channel;
      cb('/' + channel_name);
    });
  });