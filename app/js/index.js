/*global PIXI, $, HexGrid, Entity*/
(function(){
	'use strict';

	var stage = new PIXI.Stage(0xFFFFFF, true);
	stage.setInteractive(true);


	var grid = new HexGrid({
		rows: 21,
		columns: 33,
		hexSide: 20,
		stage: stage,
		margin: {
			left: 16,
			top: 35
		}
	});

	grid.render();

	var entity = new Entity({
		row: 0,
		column: 0,
		grid: grid,
		stage: stage
	});

	entity.render();

	var renderer = new PIXI.CanvasRenderer(1000,800, undefined, false);
	$(function(){
		$(".game").html(renderer.view);
		renderer.render(stage);

		setInterval(function(){
			entity.column = (entity.column + 1) % grid.columns;
			entity.render();
			renderer.render(stage);
		}, 100);
	});
})();