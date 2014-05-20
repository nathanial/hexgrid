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

		var position = this.hexPosition();

		this.contentSprite = new PIXI.Sprite(this.textures.hexFill);
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
			this.contentSprite.setTexture(this.textures.highlightedHex);
			console.log(this.contentSprite.position);
			window.Game.shouldRender = true;
		},

		unhighlight: function(){
			this.contentSprite.setTexture(this.textures.hexFill);
			this.contentSprite.position.x = 0;
			this.contentSprite.position.y = 0;
			window.Game.shouldRender = true;
		}
	});

	Hex.createTexture = function(options, fill){
		var xlen = options.diagonalX;
		var ylen = options.diagonalY;
		var side = options.hexSide;
		var g = new PIXI.Graphics();

		var x1 = 0;
		var y1 = 0;

		if(fill){
			g.beginFill(0xffffff);
			g.lineStyle(0, 0x000000, 1);
		} else {
			g.lineStyle(1, 0x000000, 1);
		}

		g.moveTo(x1,y1); //left center
		g.lineTo(x1 + xlen * 1,y1 + ylen); //left bottom
		g.lineTo(x1 + side + xlen * 1,y1 + ylen); //right bottom
		g.lineTo(x1 + side + xlen * 2, y1);//right center
		g.lineTo(x1 + side + xlen * 1, y1 - ylen); //right top
		g.lineTo(x1 + xlen * 1, y1 - ylen); //left top
		g.lineTo(x1, y1); //left center

		if(fill){
			g.endFill();
		}
		return g.generateTexture();
	};

	window.Hex = Hex;
})();