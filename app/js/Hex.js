/*global _*/
(function(){
	'use strict';

	var Hex = function(column, row, options){
		if(!(this instanceof Hex)){
			return new Hex(column, row, options);
		}
		this.column = column;
		this.row = row;
		this.highlighted = false;
		_.extend(this, options);
	};

	_.extend(Hex.prototype, {
		render: function(){
			window.Game.shouldRender = true;
			this._drawHexagon(this.column, this.row);
		},

		_drawHexagon: function(column, row){
			var xlen = this.diagonalX;
			var ylen = this.diagonalY;
			var side = this.hexSide;
			var g = this.graphics;

			var position = this.hexPosition(column, row);

			var x1 = position.x;
			var y1 = position.y;

			if(this.highlighted){
				g.beginFill(0xaaaaff);
			} else {
				g.beginFill(0xffffff);
			}
			g.lineStyle(1, 0x000000, 1);
			g.moveTo(x1,y1); //left center
			g.lineTo(x1 + xlen * 1,y1 + ylen); //left bottom
			g.lineTo(x1 + side + xlen * 1,y1 + ylen); //right bottom
			g.lineTo(x1 + side + xlen * 2, y1);//right center
			g.lineTo(x1 + side + xlen * 1, y1 - ylen); //right top
			g.lineTo(x1 + xlen * 1, y1 - ylen); //left top
			g.lineTo(x1, y1); //left center
			g.endFill();
		},

		hexPosition: function(){
			var column = this.column;
			var row = this.row;
			var offset = (column % 2 === 0 ? 1 : 0) * this.diagonalY;
			var x1 = ((this.hexSide + this.diagonalX) * column) + this.margin.left;
			var y1 = ((this.diagonalY * 2) * row + offset) + this.margin.top;
			return {
				x: x1,
				y: y1
			};
		}
	});

	window.Hex = Hex;
})();