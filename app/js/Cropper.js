/*global $, _*/
(function(){
	'use strict';

	var canvasEl = $('<canvas width="500" height="500"></canvas>');
	canvasEl.css({display: 'none'});
	$("body").append(canvasEl);
	var canvas = canvasEl[0];

	var Cropper = function(options){
		if(!(this instanceof Cropper)){
			return new Cropper(options);
		}
		this.diagonalX = options.diagonalX;
		this.diagonalY = options.diagonalY;
		this.hexSide = options.hexSide;
	};


	_.extend(Cropper.prototype, {
		crop: function(img){
			var context = canvas.getContext('2d');
			var x1 = 0;
			var y1 = this.diagonalY;
			var xlen = this.diagonalX;
			var ylen = this.diagonalY;
			var side = this.hexSide;

			context.beginPath();
			context.moveTo(x1,y1);
			context.lineTo(x1 + xlen * 1,y1 + ylen); //left bottom
			context.lineTo(x1 + side + xlen * 1,y1 + ylen); //right bottom
			context.lineTo(x1 + side + xlen * 2, y1);//right center
			context.lineTo(x1 + side + xlen * 1, y1 - ylen); //right top
			context.lineTo(x1 + xlen * 1, y1 - ylen); //left top
			context.lineTo(x1, y1); //left center
			context.clip();
			context.drawImage(img, 0,0);

			var dataURL = canvas.toDataURL("image/png");
			return dataURL;
		}
	});

	window.Cropper = Cropper;
})();