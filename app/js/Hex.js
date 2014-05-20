/*global _, PIXI*/
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
		this.sprite = new PIXI.Sprite(this.textures.unhighlightedHex);
		var position = this.hexPosition();

		_.extend(this.sprite.position, position);

		this.stage.addChild(this.sprite);
	};

	_.extend(Hex.prototype, {
		hexPosition: function(){
			var column = this.column;
			var row = this.row;
			var offset = (column % 2 === 0 ? 1 : 0) * this.diagonalY;
			var x1 = ((this.hexSide + this.diagonalX) * column);
			var y1 = ((this.diagonalY * 2) * row + offset);
			return {
				x: x1,
				y: y1
			};
		},

		highlight: function(){
			this.sprite.setTexture(this.textures.highlightedHex);
			window.Game.shouldRender = true;
		},

		unhighlight: function(){
			this.sprite.setTexture(this.textures.unhighlightedHex);
			window.Game.shouldRender = true;
		}

	});

	Hex.createMask = function(options){
		var g = new PIXI.Graphics();
		var x1 = options.x;
		var y1 = options.y;
		var xlen = options.diagonalX;
		var ylen = options.diagonalY;
		var side = options.hexSide;

		g.beginFill(0);
		g.moveTo(x1,y1); //left center
		g.lineTo(x1 + xlen * 1,y1 + ylen); //left bottom
		g.lineTo(x1 + side + xlen * 1,y1 + ylen); //right bottom
		g.lineTo(x1 + side + xlen * 2, y1);//right center
		g.lineTo(x1 + side + xlen * 1, y1 - ylen); //right top
		g.lineTo(x1 + xlen * 1, y1 - ylen); //left top
		g.lineTo(x1, y1); //left center
		g.endFill();
		return g;
	};

	Hex.createTexture = function(options){
		var xlen = options.diagonalX;
		var ylen = options.diagonalY;
		var side = options.hexSide;
		var g = new PIXI.Graphics();

		var x1 = 0;
		var y1 = 0;

		if(options.highlighted){
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
		return g.generateTexture();
	};

	window.Hex = Hex;
})();