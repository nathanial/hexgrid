/*global _, PIXI*/
(function(){
	'use strict';

	var Entity = function(options){
		if(!(this instanceof Entity)){
			return new Entity(options);
		}

		var self = this;

		this.row = options.row;
		this.column = options.column;
		this.grid = options.grid;
		this.stage = options.stage;
		this.entityWidth = 10;
		this.entityHeight = 10;
		this.graphics = new PIXI.Graphics();
		this.graphics.interactive = true;

		this.updatePosition();
		this.graphics.mousedown = function(){
			self.row += 1;
			self.updatePosition();
			self.render();
		};

		this.stage.addChild(this.graphics);
	};

	_.extend(Entity.prototype, {
		render: function(){
			var position = this.position;

			this.graphics.clear();
			this.graphics.beginFill(0xffffff);
			this.graphics.lineStyle(1, 0x000000, 1);
			this.graphics.moveTo(position.x, position.y);
			this.graphics.lineTo(position.x + 10, position.y);
			this.graphics.lineTo(position.x + 5, position.y + 10);
			this.graphics.lineTo(position.x, position.y);
			this.graphics.endFill();
		},

		updatePosition: function(){
			var position = this.grid.centerOfHex(this.column, this.row);
			position.x -= this.entityWidth / 2;
			position.y -= this.entityHeight / 2;
			this.position = position;

			this.graphics.hitArea = new PIXI.Rectangle(position.x, position.y, this.entityWidth, this.entityHeight);
		}
	});

	window.Entity = Entity;

})();