define(['app', 'lib/backbone', 'lib/underscore'], function(app){

	app.Models.DrawingEvent = Backbone.Model.extend({
		initialize: function(){
		
			this.x = 0;
			this.y = 0;
			
			this.buffer = this.get('buffer');
			this.canvas = this.get('canvas');
			
			this.dimentions = this.get('dimentions');
		},
		
		clearBuf: function(){
			this.buffer.clearRect(0,0, this.dimentions.w, this.dimentions.h);
		},
		
		applyStyle: function(){
			this.canvas.lineWidth = this.buffer.lineWidth;
			this.canvas.strokeStyle = this.buffer.strokeStyle;
			this.canvas.lineCap = this.buffer.lineCap;
			this.canvas.lineJoin = this.buffer.lineJoin;
		}
	
	});

});