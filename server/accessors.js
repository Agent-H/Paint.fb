
//accessors.js

module.exports = exports = function(mongoose, models){
	var events = require('events');

	
	/* Permet d'utiliser le module events. (code issu de http://howtonode.org/demystifying-events-in-node) */	
	
	function accessor() {
		events.EventEmitter.call(this);
	}
	// inherit events.EventEmitter
	accessor.super_ = events.EventEmitter;
	accessor = Object.create(events.EventEmitter.prototype, {
		constructor: {
			value: accessor,
			enumerable: false
		}
	});
	
	
	accessor.getDiscussion = function(req, res){	
		
		//On récupère les membres impliqués dans la discussion
		var members = req.body.members;
		
		//Et on cherche une discussion avec les mêmes membres
		models.Discussion.find({'members': members }, function (err, results) {
			if (err) { throw err; }
			
			//Si on n'a rien trouvé
			if(results.length == 0){
				console.log('creating new discuss');
				
				//On crée une nouvelle discussion avec ces membres
				var discuss = new models.Discussion({members: members});
				
				discuss.save(function (err) {
					if (err) { throw err; }
					console.log("Discussion crée avec l'id : "+discuss._id);
					
					res.send('{"id": "'+discuss._id+'"}');
				});
			}
			else{
				//On crée une variable temporaire
				var discuss = results[0];
				
				models.Action.find({'mod': discuss.id}, function(err, results){
					if (err) { throw err; }
				
					console.log('sending existng discuss with id : '+discuss.id);
				
					res.send('{"id": "'+discuss._id+'",'
						+ '"actions": '+JSON.stringify(results)+'}');
				});
				
			}
		});
	};
	
	accessor.getDiscussionCollection = function(req, res, next){
		next();
	};
		
	accessor.pushAction = function(socket){
		return function(data){
			
			var action = new models.Action(data);
			
			//Retourne l'id de l'action la plus récente
			models.Action
			.where('mod', data.mod)
			.sort('id', -1)
			.limit(1)
			.exec(
				function(err, res){
					if(err) { throw err; }
					
					/* On incrémente l'id de la dernière action pour l'ajouter dans l'ordre croissant.
						ATTENTION : cette technique n'est pas sure car une autre action peut s'insérer entre les deux requêtes.
						TODO : trouver une méthode asynchrone sûre
					*/
					action.id = (res.length == 0) ? 0 : res[0].id+1;

					action.save(function(err){
						if(err){
							console.log(err);
							return;
						}
						
						console.log('action créée avec id = '+action.id);
						
						
						accessor.emit('newAction', action);
					});
				}
			);		
		};	
	};
	
	return accessor;
};
