/*global _, PIXI, Hex*/
(function(){
	'use strict';

	var HexGrid = function(options){
		if(!(this instanceof HexGrid)){
			return new HexGrid(options);
		}
		this.rows = options.rows;
		this.margin = options.margin || {top: 0, left: 0};
		this.columns = options.columns;
		this.hexSide = options.hexSide || 25;
		this.stage = options.stage;
		this.diagonalX = Math.abs(Math.cos(90) * this.hexSide);
		this.diagonalY = Math.abs(Math.sin(90) * this.hexSide);
		this.hexWidth = this.hexSide + 2 * this.diagonalX;
		this.hexHeight = 2 * this.diagonalY;
		this.graphics = new PIXI.Graphics();
		this.stage.addChild(this.graphics);

		this.hexs = {};

		for(var i = 0; i < this.rows; i++){
			for(var j = 0; j < this.columns; j++){
				this.hexs[j+','+i] = new Hex(j, i,{
					graphics: this.graphics,
					hexSide: this.hexSide,
					diagonalX: this.diagonalX,
					diagonalY: this.diagonalY,
					margin: this.margin
				});
			}
		}
	};

	_.extend(HexGrid.prototype, {

		render: function(){
			window.Game.shouldRender = true;
			_.each(this.hexs, function(hex){
				hex.render();
			});
		},

		centerOfHex: function(column, row){
			var hex = this.getHex(column, row);
			var position = hex.hexPosition(column, row);
			return {
				x: position.x + (this.hexWidth / 2),
				y: position.y //+ (this.hexHeight / 2)
			};
		},

		highlight: function(column, row){
			var hex = this.hexs[column + ',' + row];
			hex.highlighted = true;
			hex.render();
		},

		unhighlight: function(column, row){
			var hex = this.hexs[column + ',' + row];
			hex.highlighted = false;
			hex.render();
		},

		clearHighlights: function(){
			_.each(this.hexs, function(hex){
				if(hex.highlighted){
					hex.highlighted = false;
					hex.render();
				}
			});
		},

		getHex: function(column, row){
			return this.hexs[column.toString() + ',' + row.toString()];
		}
	});

	window.HexGrid = HexGrid;
})();

