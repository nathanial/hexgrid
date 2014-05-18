/*global _, PIXI*/
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
	};

	_.extend(HexGrid.prototype, {

		render: function(){
			for(var i = 0; i < this.rows; i++){
				for(var j = 0; j < this.columns; j++){
					this._drawHexagon(j, i);
				}
			}
		},

		hexPosition: function(column, row){
			var offset = (column % 2 === 0 ? 1 : 0) * this.diagonalY;
			var x1 = ((this.hexSide + this.diagonalX) * column) + this.margin.left;
			var y1 = ((this.diagonalY * 2) * row + offset) + this.margin.top;
			return {
				x: x1,
				y: y1
			};
		},

		centerOfHex: function(column, row){
			var position = this.hexPosition(column, row);
			return {
				x: position.x + (this.hexWidth / 2),
				y: position.y //+ (this.hexHeight / 2)
			};
		},

		_drawHexagon: function(column, row){
			var xlen = this.diagonalX;
			var ylen = this.diagonalY;
			var side = this.hexSide;
			var g = this.graphics;


			var position = this.hexPosition(column, row);

			var x1 = position.x;
			var y1 = position.y;

			g.beginFill(0xffffff);
			g.lineStyle(1, 0x000000, 1);
			g.moveTo(x1,y1); //left center
			g.lineTo(x1 + xlen * 1,y1 + ylen); //left bottom
			g.lineTo(x1 + side + xlen * 1,y1 + ylen); //right bottom
			g.lineTo(x1 + side + xlen * 2, y1);//right center
			g.lineTo(x1 + side + xlen * 1, y1 - ylen); //right top
			g.lineTo(x1 + xlen * 1, y1 - ylen); //left top
			g.lineTo(x1, y1); //left center
			g.endFill();
		}
	});

	window.HexGrid = HexGrid;
})();

