/*global PIXI, $, HexGrid*/
(function(){
	'use strict';

	var stage = new PIXI.Stage(0xFFFFFF, true);
	stage.setInteractive(true);

	var g = new PIXI.Graphics();

	var grid = new HexGrid({
		rows: 21,
		columns: 33,
		hexSide: 20,
		graphics: g,
		margin: {
			left: 16,
			top: 35
		}
	});

	grid.render();

	stage.addChild(g);

	var renderer = new PIXI.CanvasRenderer(1000,800, undefined, false);
	$(function(){
		$(".game").html(renderer.view);
		renderer.render(stage);
	});
})();