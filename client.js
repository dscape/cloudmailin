var socket = io.connect('/');

function email_hook (email) { console.log(email); }
function connect_hook (channel) { 
  return function () { console.log('joined #' + channel); };
}

function subscribe(name) {
  socket.emit('subscribe', name, function(data){
    var channel = io.connect('/' + data.namespace);
    channel.on('connect', connect_hook(data.namespace));
    channel.on('email', email_hook);
  });
}