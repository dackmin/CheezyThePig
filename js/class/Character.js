function Character(level, pickups, enemies, background, viewport){

	//Inherit event manager
	FF.EventManager.call(this);


	//Create sprite
	var sprite = new FF.SpriteSheet({ image : "res/img/charsets/player.png", frame_size : [98,66], bounds : [39,25,44,41] });
	var animation = new FF.SpriteAnimation({frames : sprite.frames, frame_duration : 100 });


	//Set default animations
	sprite.anim_default_left = animation.slice(0,3);
	sprite.anim_left = animation.slice(8,11);
	sprite.anim_default_right = animation.slice(4,7);
	sprite.anim_right = animation.slice(12,15);
	sprite.anim_jump_left = animation.slice(16,17);
	sprite.anim_jump_right = animation.slice(22,23);
	sprite.setFrame(sprite.anim_default_right.next());


	//Setup player start
	var actions = level.getObjectGroup("actions").objects;
	for(var i in actions)
		if(actions[i].properties["action"] == "start")
			sprite.x = actions[i].x, sprite.y = actions[i].y - actions[i].rect().height * 3;


	//Setup move vars
	var
		direction = "right",
		vx = 0,
		vy = 0,
		can_jump = true,
		character_speed = 10,
		character_jump_height = 25;


	//Setup player stats
	var
		coins = 0,
		score = 0,
		hearts = 6,
		lives = 3,
		can_be_touched = true,
		score_multiplier = { coins : 10, lives : 100, kill : 300 };


	//Setup touched timer (when you crash onto an enemy, to make you blink a little)
	var timer = new FF.Timer({ timeout : 2000, interval : 200 });
	timer.addEventListener("tick",function(){ sprite.alpha = (sprite.alpha == 0.5) ? 1 : 0.5; });
	timer.addEventListener("start",function(){ sprite.alpha = 0.5, can_be_touched = false; });
	timer.addEventListener("timeout",function(){ sprite.alpha = 1, can_be_touched = true; });


	this.update = function(){

		//Update touched timer
		timer.update();


		//Check movements
		vx = 0;

		if(FF.InputManager.pressed(["left","gamepad_left"]) || FF.InputManager.gamepad_axis_values.left.x <= -0.5)
			vx = -character_speed, sprite.setFrame(sprite.anim_left.next()), direction = "left";

	    else if(FF.InputManager.pressed(["right", "gamepad_right"]) || FF.InputManager.gamepad_axis_values.left.x >= 0.5)
			vx = character_speed, sprite.setFrame(sprite.anim_right.next()), direction = "right";

		else
			sprite.setFrame((direction == "left") ? sprite.anim_default_left.next() : sprite.anim_default_right.next());


		if(FF.InputManager.pressedWithoutRepeat(["up", "gamepad_face_button_1"]))
			if(can_jump)
				vy = -(character_jump_height), can_jump = false;

		vy += 1;


		//Update position on X
		sprite.x += vx;

		if(viewport.moving)
			background.camera_x+=vx*10;
		var block = level.itemCollideWithSomethingInMap(sprite, { obj_group : "obstacles" })[0];

		if(sprite.rect().x <= level.x || sprite.rect().x + sprite.rect().width >= level.rect().width || (block && block.rect().height > sprite.rect().height / 2)){
			sprite.x -= vx;
			if(viewport.moving)
				background.camera_x-=vx*10;
		}
		vx = 0;


		//Update position on y
		can_jump = false, sprite.y += vy;
		var block = level.itemCollideWithSomethingInMap(sprite, { obj_group : "obstacles" })[0];

		if(block && block.properties && block.properties["jumping"]) //Jumping on a spring
			vy = -parseInt(block.properties["jumping"]);

		else if(block && vy > 0 && sprite.rect().y < block.rect().y) //Blocked going down
			can_jump = true, sprite.y = block.rect().y - sprite.rect().height - 1, vy = 0;

		else if(block && vy < 0 && block.rect().height >= sprite.rect().height / 2) //Blocked going up
			sprite.y = block.rect().y + block.rect().height, vy = 0, sprite.setFrame((direction == "left") ? sprite.anim_jump_left.next() : sprite.anim_jump_right.next());

		else //FUCKING JUMPING MAN, MUCH HIGH, SO HEIGHT, WOW, DOGE
			sprite.setFrame((direction == "left") ? sprite.anim_jump_left.next() : sprite.anim_jump_right.next());


		//Check collisions with monsters
		var monsters = FF.Util.collideOneWithMany(sprite, enemies.values);
		if(monsters.length > 0 && can_be_touched == true){
			if(sprite.rect().y + sprite.rect().height < monsters[0].rect().y + monsters[0].rect().height && sprite.rect().y + sprite.rect().height > monsters[0].rect().y && !can_jump)
				vy = -parseInt(25), monsters[0].die(enemies), score+= score_multiplier.kill;
			else
				hearts--, can_be_touched = false, timer.restart();
		}


		//Check player hearts
		if(hearts <= 0){
			if(lives > 0)
				this.die();
			else
				this.gameover();

			return;
		}


		//Check player lives
		if(lives <= 0)
			return this.gameover();


		//Check collisions with pickups
		var items = FF.Util.collideOneWithMany(sprite, pickups.values);
		for(var i in items){
			pickups.del(items[i]);

			switch(items[i].getType()){
				case "coin":
					coins++;
					score+= score_multiplier.coins;
					break;
				case "extra_life":
					lives++;
					score+= score_multiplier.lives;
					break;
				default:
					break;
			}
		}


		//Check collisions with end of level
		var actions = FF.Util.collideOneWithMany(sprite, level.getObjectGroup("actions").objects);
		for(var i in actions)
			if(actions[i].properties["action"] == "end")
				this.dispatchEvent({ type : "endlevel" });


		//Check if player is still in the world
		if(sprite.rect().y > level.rect().height)
			this.die();
	};


	this.draw = function(){
		sprite.draw();
	};


	this.getSprite = function(){
		return sprite;
	};


	this.changeLevel = function(m){
		level = m;
		this.setup();
	};


	this.die = function(){
		hearts = 6;
		lives--;
		can_be_touched = true;
		timer.reset();
		this.dispatchEvent({ type : "dead" });
	};


	this.gameover = function(){
		hearts = 6;
		lives = 3;
		coins = 0;
		score = 0;
		can_be_touched = true;
		timer.reset();
		this.dispatchEvent({ type : "gameover" });
	};


	this.getHearts = function(){
		return hearts;
	};


	this.getLives = function(){
		return lives;
	};


	this.getCoins = function(){
		return coins;
	};


	this.getScore = function(){
		return score;
	};


};
