require([
	"jquery",
	"lib/underscore",
	"lib/backbone",
	"lib/jquery-ui",
	"app",
	"models/Facebook",
	"models/Discussion",
	"collections/Discussions",
	"views/main"],
	function($) {
		//Toutes les d�pendences ont �t� charg�es
		$(function() {
			//Initialisation de l'application
			app.init();
		});
});