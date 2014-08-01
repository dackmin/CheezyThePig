function MainGameState(){

	var levels = [], current_level = GS_LEVEL_INDEX;
	var background, viewport, pickups, enemies, character, main_timer, hud;
	var paused = false;

	this.setup = function(){

		//Setup levels
		levels.push(new FF.TiledMap({ map : "res/maps/level-1-1.tmx" }));
		levels.push(new FF.TiledMap({ map : "res/maps/level-1-2.tmx" }));
		levels.push(new FF.TiledMap({ map : "res/maps/level-1-3.tmx" }));


		//Generate parallax background
		background = new FF.Parallax({ layers : [
			{ sprite : new FF.Sprite({ image : "res/img/parallax/layer-3.png", fitRenderHeight : true }), speed : 100 },
			{ sprite : new FF.Sprite({ image : "res/img/parallax/layer-2.png", fitRenderHeight : true }), speed : 70 },
			{ sprite : new FF.Sprite({ image : "res/img/parallax/layer-1.png", fitRenderHeight : true }), speed : 30 }
		]});


		//Create general viewport
		viewport = new FF.Viewport({ max_x : levels[current_level].rect().width, max_y : levels[current_level].rect().height });


		//Get map content
		enemies = new FF.ArrayList();
		pickups = new FF.ArrayList();
		this.getLevelContent();


		//Create our wonderful pig
		character = new Character(levels[current_level],pickups,enemies,background,viewport);
		character.addEventListener("endlevel", function(){ nextLevel(); });
		character.addEventListener("dead", function(){ FF.InputManager.resetPressedKeys(); restartLevel(); });


		//Create main timer
		main_timer = new FF.Timer({ timeout : parseInt(levels[current_level].map.properties["timeout"]) * 1000, autostart : true, interval : 100 });
		main_timer.addEventListener("timeout",function(){ FF.InputManager.resetPressedKeys(); restartLevel(); });


		//Create player head user display
		//hud = new HUD(character,main_timer);

	};

	this.update = function(){
		document.getElementById("fps").innerHTML = GAME.fps+" fps";

		if(FF.InputManager.pressedWithoutRepeat(["p","esc","gamepad_start"]))
			paused = (paused == true) ? false : true;

		if(!paused){
			main_timer.update();

			for(var i = 0; i < enemies.size; i++) enemies.peek(i).update();

			character.update();
			viewport.centerAround(character.getSprite());
			//hud.update();
		}
	};

	this.draw = function(){
		background.draw();

		for(var i = 0; i < enemies.size; i++) viewport.draw(enemies.peek(i).getSprite());
		viewport.draw(levels[current_level]);
		for(var i = 0; i < pickups.size; i++) viewport.draw(pickups.peek(i).getSprite());

		viewport.draw(character.getSprite());
	};

	this.getLevelContent = function(){
		enemies.clear(), pickups.clear();


		//Get enemies
		try{
			var monsters = levels[current_level].getObjectGroup("enemies").objects;
			for(var i in monsters){

				switch(monsters[i].properties["type"]){
					case "snail":
						enemies.add(new Snail(monsters[i]));
						break;
					case "fish":
						enemies.add(new Fish(levels[current_level], monsters[i]));
						break;
					default:
						break;
				}

			}
		} catch(e){}


		//Get pickups
		try{
			var stuff = levels[current_level].getObjectGroup("pieces").objects;
			for(var i in stuff){

				switch(stuff[i].properties["pickup_type"]){
					case "extra_life":
						pickups.add(new ExtraLife(stuff[i]));
						break;
					case "coin":
						pickups.add(new Coin(stuff[i]));
						break;
					default:
						break;
				}
			}
		} catch(e){}
	};

};
