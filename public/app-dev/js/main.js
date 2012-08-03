requirejs.config({
    paths: {
        'socket.io': '../../socket.io/socket.io'
    }
});

require([
	"jquery",
	"socket.io",
	"lib/underscore",
	"lib/backbone",
	"lib/jquery-ui",
	"app",
	"models/Facebook",
	"models/Discussion",
	"models/Drawing",
	"collections/Discussions",
	"collections/Tools",
	"views/main"],
	function($) {
		//Toutes les d�pendences ont �t� charg�es
		$(function() {
			//Initialisation de l'application
			app.init();
		});
});