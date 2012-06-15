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
			
			//Instanciation des collections
			this.collections.discussions = new this.Collections.Discussions();
			
			//instanciation des vues : la vue principale instancie les autres
			this.views.main = new this.Views.main();
			
			//On v�rifie que l'utilisateur est connect�
			this.models.facebook.getLoginStatus(function(status){
				//On cache l'�cran de chargement maintenant que tous les fichiers sont charg�s.
				this.$('#loading_frame').hide();
			
				//Selon le statut, on montre l'�cran principal ou l'�cran de login
				if(status === 'connected')
					app.views.main.showMainFrame();
				else
					app.views.main.showLoginFrame();
			});
		}
	};
});