/*global PIXI, $, HexGrid, Entity*/
(function(){
	'use strict';

	var stage = new PIXI.Stage(0xFFFFFF, true);
	stage.interactive = true;

	window.Game = {};


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

	var entity = new Entity({
		row: 10,
		column: 10,
		grid: grid,
		stage: stage
	});

	var renderer = new PIXI.autoDetectRenderer(1000,800, undefined, false, false);
	renderer.interactive = true;
	$(function(){
		$(".game").html(renderer.view);
		renderer.render(stage);

		function render(){
			if(window.Game.shouldRender){
				window.Game.shouldRender = false;
				renderer.render(stage);
			} else {
				stage.interactionManager.update();
			}
			requestAnimationFrame(render);
		}

		render();
	});
})();