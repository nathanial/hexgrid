/*global PIXI, $, HexGrid, Entity*/
(function(){
	'use strict';

	var stage = new PIXI.Stage(0xFFFFFF, true);
	stage.interactive = true;


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
	renderer.interactive = true;
	$(function(){
		$(".game").html(renderer.view);
		renderer.render(stage);

		function render(){
			renderer.render(stage);
			requestAnimationFrame(render);
		}

		render();
	});
})();