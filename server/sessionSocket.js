
/* sessionSocket.js :
	ajoute les propri�t�s session() et sessionID() aux sockets
	
	� utiliser avec le transport xhr-polling et le middleware session (ins�r� grace � socketglue.js)
*/
module.exports = function(io){
	io.sockets.on('connection', function(socket){
	
		if(socket.manager.transports[socket.id].name != 'xhr-polling'){
			throw 'SessionSocket only works with xhr-polling transport, please use io.set("transports", ["xhr-polling"]);';
		}
		socket.session = function(){
			return socket.manager.transports[socket.id].req.session;
		};
		socket.sessionID = function(){
			return socket.manager.transports[socket.id].req.sessionID;
		};
	});

};