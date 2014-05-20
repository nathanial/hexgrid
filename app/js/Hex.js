/*global _, PIXI*/
(function(){
	'use strict';

	var Hex = function(column, row, options){
		if(!(this instanceof Hex)){
			return new Hex(column, row, options);
		}
		this.column = column;
		this.row = row;
		_.extend(this, options);

		var position = this.hexPosition();

		this.contentSprite = new PIXI.Sprite(this.selectedTexture);
		this.contentSprite.position = {
			x: 12,
			y: 11
		};
		this.borderSprite = new PIXI.Sprite(this.textures.hexBorder);

		this.container = new PIXI.DisplayObjectContainer();
		this.container.addChild(this.contentSprite);
		this.container.addChild(this.borderSprite);

		_.extend(this.container.position, position);
		this.stage.addChild(this.container);
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
//			this.contentSprite.setTexture(this.textures.highlightedHex);
//			this.contentSprite.position = {
//				x : 12,
//				y: 11
//			};
//			window.Game.shouldRender = true;
		},

		unhighlight: function(){
//			this.contentSprite.setTexture(this.textures.hexFill);
//			this.contentSprite.position.x = 0;
//			this.contentSprite.position.y = 0;
//			window.Game.shouldRender = true;
		}
	});

	Hex.createTexture = function(options){
		var xlen = options.diagonalX;
		var ylen = options.diagonalY;
		var side = options.hexSide;
		var g = new PIXI.Graphics();

		var x1 = 0;
		var y1 = 0;

		g.lineStyle(1, 0x000000, 1);

		g.moveTo(x1,y1);
		g.lineTo(x1+side, y1);
		g.lineTo(x1+side+xlen, y1+ylen);
		g.lineTo(x1+side, y1+ylen*2);
		g.lineTo(x1, y1+ylen*2);
		g.lineTo(x1-xlen,y1+ylen);
		g.lineTo(x1,y1);

		return g.generateTexture();
	};

	window.Hex = Hex;
})();