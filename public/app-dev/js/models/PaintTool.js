define(['app', 'lib/backbone', 'lib/underscore', 'models/Tool'], function(app){

	app.Models.PaintTool = app.Models.Tool.extend({
		
		defaults: {
			id: 'paint'
		},
		
		initialize: function(){
			this.path = new Array();
			
			this.properties = ['color1', 'lineWidth'];
		},
		
		onMousedown: function(e){
			var buffer = this.env.get('buffer');
			
			buffer.beginPath();
			buffer.moveTo(e.x, e.y);
			
			this.path.push({x: e.x, y: e.y});
			
			//On rajoute cette coordonn�e car chrome ne dessine rien si on fait un simple point
			this.path.push({x: e.x+1, y: e.y});
		},
		
		onMouseup: function(e){	
			//On envoie une action de dessin au serveur
			this.sendAction({
				path: this.path,
				//Propri�t�s n�cessaires pour cet outil
				properties: this.properties
			});
			
			//on r�initialise le tableau m�moire
			this.path.length = 0;
		},
		
		onMousemove: function(e){
		
			// On r�cup�re les coordonn�es du dernier point. 
			var lastPt = this.path[this.path.length-1];
			
			// Celui-ci doit diff�rer du suivant sinon on n'ajoute pas le suivant car il ne servira � rien
			if(e.x != lastPt.x && e.y != lastPt.y){
				//On ajoute la nouvelle coordonn�e
				this.path.push({x: e.x, y: e.y});
			}
			
			//On nettoie le buffer
			this.env.clearBuf();

			//Et on redessine le chemin
			this.drawPath(this.env.get('buffer'), this.path);
		},
		
		drawPath: function(ctx, path){
			ctx.beginPath();
			
			for(var i = 0 ; i < path.length ; i++){
				ctx.lineTo(path[i].x, path[i].y);
			}
			
			ctx.stroke();
		},
		
		drawAction: function(act, ctx){
			if(typeof(act.path) != 'undefined'){
				this.updateContext(ctx, act.properties);
				this.drawPath(ctx, act.path);	
				
				//Si on n'est pas entrain de dessiner la suite
				if(this.path.length == 0){
					//On nettoie le buffer
					this.env.clearBuf();
				}
			}
		},
		
		updateContext: function(ctx, properties){
		
			//S'assure que les "properties" requises soient fournies et les remplace par celles de l'environnement au besoin
			properties = this.getCleanedProperties(this.properties, properties);
			
			ctx.strokeStyle = properties.color1;
			ctx.lineWidth = properties.lineWidth;
			ctx.lineCap = 'round';
			ctx.lineJoin = 'round';
		}
	
	});

});