define(['app', 'lib/backbone', 'lib/underscore'], function(app){

	app.Models.Discussion = Backbone.Model.extend({
		
		defaults: {
			members: new Array(),
			
			//Stocke les actions de dessin dans l'ordre chronologique
			actions: new Array(),
			
			canvas: false
		},
		
		initialize: function(){
			this.url = "/store/discuss/";
			
			
			this.actionCur = 0;
		},
		
		/*
			La m�thode createAction() doit �tre appell�e pour ajouter une action. 
			Elle int�rroge le serveur pour garantir que, dans le cas o� les deux utilisateurs envoient une 
			action en m�me temps, elles soient tout de m�me class�es dans le m�me ordre chez les deux clients. 
		*/
		createAction: function(action){
			app.socket.emit('newAct', {mod: this.get('id'), act: action});
		},
		
		/*
			Cette m�thode est appell�e par la collection qui �coute le serveur et re�oit les actions (cr�es localement comme � distance sans distinction)
		*/
		pushAction: function(action){
			if(typeof(action.id) == 'undefined')
				throw "method pushAction() requires action.id, use createAction() instead";
				
			this.get('actions')[action.id] = action;
			
			this.readActions();
		},
		
		readActions: function(){
			while(this.get('actions')[this.actionCur]){
				
				//TODO : restituer l'action
				console.log(this.get('actions')[this.actionCur]);
				
				this.actionCur++;
			}
		}
		
	
	});

});
