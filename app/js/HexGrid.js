/*global _, PIXI, Hex*/
(function(){
	'use strict';

	var HexGrid = function(options){
		if(!(this instanceof HexGrid)){
			return new HexGrid(options);
		}
		this.rows = options.rows;
		this.columns = options.columns;
		this.hexSide = options.hexSide || 25;
		this.stage = options.stage;
		this.diagonalX = Math.abs(Math.cos(90) * this.hexSide);
		this.diagonalY = Math.abs(Math.sin(90) * this.hexSide);
		this.hexWidth = this.hexSide + 2 * this.diagonalX;
		this.hexHeight = 2 * this.diagonalY;

		this.hexs = {};

		this.textures = {
			unhighlightedHex: Hex.createTexture({
				diagonalX: this.diagonalX,
				diagonalY: this.diagonalY,
				hexSide: this.hexSide
			}),
//			highlightedHex: Hex.createTexture({
//				diagonalX: this.diagonalX,
//				diagonalY: this.diagonalY,
//				hexSide: this.hexSide,
//				highlighted: true
//			})
			highlightedHex: PIXI.Texture.fromImage("img/textures/Free-Water-Texture-500x375.jpg")
		}

		for(var i = 0; i < this.rows; i++){
			for(var j = 0; j < this.columns; j++){
				this.hexs[j+','+i] = new Hex(j, i,{
					hexSide: this.hexSide,
					diagonalX: this.diagonalX,
					diagonalY: this.diagonalY,
					stage: this.stage,
					textures: this.textures,
					masks: this.masks
				});
			}
		}
	};

	_.extend(HexGrid.prototype, {
		getHex: function(column, row){
			return this.hexs[column.toString() + ',' + row.toString()];
		}
	});

	window.HexGrid = HexGrid;
})();

