/*global _, PIXI, Hex, Cropper, $*/
(function(){
	'use strict';

	function choose(array){
		var r = Math.round(Math.random() * array.length);
		return array[r % array.length];
	}

	function loadImage(path){
		var img = new Image();
		var d = $.Deferred();
		img.onload = function(){
			d.resolve(img);
		};
		img.src = path;
		return d.promise();
	}

	function emptyTexture(){
		var graphics = new PIXI.Graphics();
		return graphics.generateTexture();
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

		this.textures = {
			hexBorder: Hex.createTexture({
				diagonalX: this.diagonalX,
				diagonalY: this.diagonalY,
				hexSide: this.hexSide
			}, false),
			hexFill: emptyTexture()
		};

		this.hexs = {};

		loadImage("img/textures/Free-Water-Texture-500x375.jpg").then(function(waterImage){
			loadImage("img/textures/3.sand-texture.jpg").then(function(sandImage){
				var waterCrop = self.cropper.crop(waterImage);
				var sandCrop = self.cropper.crop(sandImage);

				self.textures.waterTexture = PIXI.Texture.fromImage(waterCrop);
				self.textures.sandTexture = PIXI.Texture.fromImage(sandCrop);

				for(var i = 0; i < self.rows; i++){
					for(var j = 0; j < self.columns; j++){
						self.hexs[j+','+i] = new Hex(j, i,{
							hexSide: self.hexSide,
							diagonalX: self.diagonalX,
							diagonalY: self.diagonalY,
							stage: self.stage,
							textures: self.textures,
							masks: self.masks,
							hexWidth: self.hexWidth,
							hexHeight: self.hexHeight,
							selectedTexture: choose([self.textures.waterTexture, self.textures.sandTexture])
						});
					}
				}
				window.Game.shouldRender = true;
			});
		});






	};

	_.extend(HexGrid.prototype, {
		getHex: function(column, row){
			return this.hexs[column.toString() + ',' + row.toString()];
		}
	});

	window.HexGrid = HexGrid;
})();

