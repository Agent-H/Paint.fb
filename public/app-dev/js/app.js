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
			
			//D�marrage de la connection par socket.io
			this.socket = io.connect(window.location.protocol+'//'+window.location.host);
			
			//Instanciation des mod�les
			this.models.facebook = new this.Models.Facebook();
			this.models.drawing = new this.Models.Drawing();
			
			//Instanciation des collections
			this.collections.discussions = new this.Collections.Discussions();
			
			//instanciation des vues : la vue principale instancie les autres
			this.views.main = new this.Views.main();
			
			//On v�rifie que l'utilisateur est connect�
			this.models.facebook.getLoginStatus(function(status){
				//On cache l'�cran de chargement maintenant que tous les fichiers sont charg�s.
				this.$('#loading_frame').hide();
			
				//Selon le statut, on montre l'�cran principal ou l'�cran de login
				if(status === 'connected'){
					app.views.main.showMainFrame();
					app.collections.discussions.fetch();
				}
				else
					app.views.main.showLoginFrame();
			});
		}
	};
});