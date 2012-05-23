define(function(){

	return window.app = {	
		// Classes
		Collections: {},
		Models: {},
		Views: {},
		// Instances
		collections: {},
		models: {},
		views: {},
		init: function () {
			// Initialisation de l'application ici
			console.log('app init');
			
			//On instancie le mod�le facebook
			this.models.facebook = new this.Models.Facebook();
			this.views.main = new this.Views.main();
			
			//On v�rifie que l'utilisateur est connect�
			this.models.facebook.getLoginStatus(function(status){
				//Selon le statut, on montre l'�cran principal ou l'�cran de login
				if(status === 'connected')
					app.views.main.showMainFrame();
				else
					app.views.main.showLoginFrame();
			})
			.on('login', function(){
				//L'utilisation d'une fonction anonyme permet de pr�server la variable this lors de l'appel de showMainFrame()
				app.views.main.showMainFrame();
			});
		}
	};
});