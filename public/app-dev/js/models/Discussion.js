define(['app', 'lib/backbone', 'lib/underscore'], function(app){

	app.Models.Discussion = Backbone.Model.extend({
		
		defaults: {
			members: new Array(),
			
			//Stocke les actions de dessin dans l'ordre chronologique
			actions: new Array()
		},
		
		initialize: function(){
			this.url = "/store/model/discussion";
			
			
			this.actionCur = 0;
			this.get('members').sort(function(a,b){return a-b});
			
			//Lorsque les actions initiales ont �t� charg�es du serveur, on les affiche
			this.on('sync', this.readActions, this);
		},
		
		addMember: function(member){
			var members = this.get('members');
			members.push(member);
			members.sort(function(a,b){return a-b});
		},
		
		/*
			La m�thode createAction() doit �tre appell�e pour ajouter une action. 
			Elle int�rroge le serveur pour garantir que, dans le cas o� les deux utilisateurs envoient une 
			action en m�me temps, elles soient tout de m�me class�es dans le m�me ordre chez les deux clients. 
		*/
		createAction: function(action){
			action.mod = this.id;
			app.socket.emit('newAct', action);
		},
		
		/*
			Cette m�thode est appell�e par la collection qui �coute le serveur et re�oit les actions (cr��es localement comme � distance sans distinction)
		*/
		pushAction: function(action){
			if(typeof(action.id) == 'undefined')
				throw "method pushAction() requires action.id, use createAction() instead";
				
			this.get('actions')[action.id] = action;
			
			this.readActions();
		},
		
		readActions: function(){
			//tant qu'il y a des actions � executer
			while(this.get('actions')[this.actionCur]){
				
				//On execute l'action avec l'outil appropri�
				var action = this.get('actions')[this.actionCur];
				app.models.drawing.get('tools').get(action.tool).drawAction(action.data, this.canvas.get()[0].getContext('2d'));
				
				//Et on passe � la suivante.
				this.actionCur++;
			}
		}
	
	});

});
