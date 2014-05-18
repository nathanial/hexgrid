/*global _*/
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
		this.graphics = options.graphics;
		this.diagonalX = Math.abs(Math.cos(90) * this.hexSide);
		this.diagonalY = Math.abs(Math.sin(90) * this.hexSide);
	};

	_.extend(HexGrid.prototype, {

		render: function(){
			for(var i = 0; i < this.rows; i++){
				for(var j = 0; j < this.columns; j++){
					this._drawHexagon(j, i);
				}
			}
		},

		_drawHexagon: function(column, row){
			var xlen = this.diagonalX;
			var ylen = this.diagonalY;
			var side = this.hexSide;
			var g = this.graphics;

			var offset = (column % 2 === 0 ? 1 : 0) * ylen;
			var x1 = ((side + xlen) * column) + this.margin.left;
			var y1 = ((ylen * 2) * row + offset) + this.margin.top;


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

