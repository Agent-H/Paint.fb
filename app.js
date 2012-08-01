
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

//Mise en place du serveur socket.io
var io = require('socket.io').listen(app);

//Configuration de sockets.io
io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

io.sockets.on('connection', function (socket) {
  socket.emit('test', { hello: 'world' });
  socket.on('ping', function (data) {
    socket.emit('pong', {data: data});
  });
});


// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.get('/', routes.index_d);
  app.post('/', routes.index_d)
});

app.configure('production', function(){
  app.use(express.errorHandler());
  app.get('/', routes.index);
  app.post('/', routes.index)
});

app.get('/app-dev', routes.app);
app.get('/app', routes.app);
app.post('/app', routes.app);

//ROUTE TEMPORAIRE POUR LES TESTS COTE CLIENT
app.post('/store/discuss', (function(){
		var counter = 0;
		
		return function(req, res, next){
			if(req.body.id)
				res.send('{"id": "'+req.body.id+'"}');
			else
				res.send('{"id": "'+ (counter++) +'"}');
		};
	})()
);

//Route sp�ciale pour mettre en cache le fichier channel
app.get('/channel.html', routes.channel);

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
