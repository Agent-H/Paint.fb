require([
	"jquery",
	"lib/underscore",
	"lib/backbone",
	"app",
	"models/Facebook"], function($) {
    //Toutes les d�pendences ont �t� charg�es
    $(function() {
        app.init();
    });
});