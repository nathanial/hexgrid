/*global _, PIXI, Hex, Cropper, $*/
(function(){
	'use strict';

	function loadImage(path){
		var img = new Image();
		var d = $.Deferred();
		img.onload = function(){
			d.resolve(img);
		};
		img.src = path;
		return d.promise();
	}

	var HexGrid = function(options){
		if(!(this instanceof HexGrid)){
			return new HexGrid(options);
		}
		var self = this;
		this.rows = options.rows;
		this.columns = options.columns;
		this.hexSide = options.hexSide || 25;
		this.stage = options.stage;
		this.diagonalX = Math.abs(Math.cos(90) * this.hexSide);
		this.diagonalY = Math.abs(Math.sin(90) * this.hexSide);
		this.hexWidth = this.hexSide + 2 * this.diagonalX;
		this.hexHeight = 2 * this.diagonalY;
		this.cropper = new Cropper({
			diagonalX: this.diagonalX,
			diagonalY: this.diagonalY,
			hexSide: this.hexSide
		});

		loadImage("img/textures/Free-Water-Texture-500x375.jpg").then(function(image){
			var dataURI = self.cropper.crop(image);
			self.textures.highlightedHex = PIXI.Texture.fromImage(dataURI);
		});

		this.hexs = {};


		this.textures = {
			hexBorder: Hex.createTexture({
				diagonalX: this.diagonalX,
				diagonalY: this.diagonalY,
				hexSide: this.hexSide
			}, false),
			hexFill: Hex.createTexture({
				diagonalX: this.diagonalX,
				diagonalY: this.diagonalY,
				hexSide: this.hexSide
			}, true)
		};

		for(var i = 0; i < this.rows; i++){
			for(var j = 0; j < this.columns; j++){
				this.hexs[j+','+i] = new Hex(j, i,{
					hexSide: this.hexSide,
					diagonalX: this.diagonalX,
					diagonalY: this.diagonalY,
					stage: this.stage,
					textures: this.textures,
					masks: this.masks,
					hexWidth: this.hexWidth,
					hexHeight: this.hexHeight
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

