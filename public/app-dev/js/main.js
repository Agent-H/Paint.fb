require([
	"jquery",
	"lib/underscore",
	"lib/backbone",
	"lib/jquery-ui",
	"app",
	"models/Facebook",
	"views/main",
	"views/menu"],
	function($) {
		//Toutes les d�pendences ont �t� charg�es
		$(function() {
			//Initialisation de l'application
			app.init();
		});
});