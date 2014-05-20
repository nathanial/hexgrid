/*global _, PIXI, _*/
(function(){
	'use strict';

	//this.graphics.hitArea = new PIXI.Rectangle(position.x, position.y, this.entityWidth, this.entityHeight);

	var triangleTexture = (function(){
		var graphics = new PIXI.Graphics();
		graphics.clear();
		graphics.beginFill(0xffffff);
		graphics.lineStyle(1, 0x000000, 1);
		graphics.moveTo(0, 0);
		graphics.lineTo(10, 0);
		graphics.lineTo(5, 10);
		graphics.lineTo(0, 0);
		graphics.endFill();
		return graphics.generateTexture();
	})();

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
		this.sprite = new PIXI.Sprite(triangleTexture);
		this.sprite.interactive = true;

		this.updatePosition();
		this.sprite.mouseover = function(){
			_.each(self._adjacent(), function(adjacent){
				var hex = self.grid.getHex(adjacent.column, adjacent.row);
				if(hex){
					hex.highlight();
				}
			});
		};
		this.sprite.mouseout = function(){
			_.each(self._adjacent(), function(adjacent){
				var hex = self.grid.getHex(adjacent.column, adjacent.row);
				if(hex){
					hex.unhighlight();
				}
			});
		}

		this.stage.addChild(this.sprite);

	};

	_.extend(Entity.prototype, {
		updatePosition: function(){
			var hex = this.grid.getHex(this.column, this.row);
			var hexPositon = hex.hexPosition();
			_.extend(this.sprite.position, {
				x: hexPositon.x + (this.grid.hexWidth / 2 - this.entityWidth / 2),
				y: hexPositon.y + (this.grid.hexHeight / 2 - this.entityHeight / 2)
			});
		},

		_adjacent: function(){
			return [
				{row: this.row+1, column: this.column},
				{row: this.row, column:this.column+1},
				{row: this.row+1, column:this.column+1},
				{row: this.row-1, column:this.column},
				{row: this.row, column:this.column-1},
				{row: this.row, column:this.column-1},
				{row: this.row+1, column:this.column-1}
			];
		}
	});

	window.Entity = Entity;

})();