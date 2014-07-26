function MenuGameState(){

	var backgrounds = [], background_sprite, grounds = [], ground_sprite, foreground, cheezy, cheezy_moves, cheezy_logo, cheezy_logo_scaleUp, cheezy_logo_scaleDown;
	var possible_clouds = ["res/img/menu/cloud1.png","res/img/menu/cloud2.png","res/img/menu/cloud3.png"], cloud_count = 10, clouds_min_y = 0, clouds_max_y = 400, clouds = [], clouds_speed = 1;
	var play_button, settings_button, star;

	this.setup = function(){


		//Setup background
		background_sprite = new FF.Sprite({ image : "res/img/menu/bg_grasslands.png" });

		for(var i = 0; i < FF.Render.getHeight() / background_sprite.rect().width; i++){
			var bg = new FF.Sprite({ image : "res/img/menu/bg_grasslands.png", fitRenderHeight : true });
			bg.x = bg.rect().width * i;

			backgrounds.push(bg);
		}


		//Setup "foreground"
		foreground = new FF.Sprite({ image : "res/img/menu/foreground.png" });
		foreground.x = FF.Util.getCenterFromItem(foreground);
		foreground.y = FF.Render.getHeight() - foreground.rect().height;


		//Setup ground
		ground_sprite = new FF.Sprite({ image : "res/img/menu/grassMid.png" });

		for(var i = 0; i <= FF.Render.getWidth() / ground_sprite.rect().width; i++){
			var ground = new FF.Sprite({ image : "res/img/menu/grassMid.png" });
			ground.x = ground.rect().width * i;
			ground.y = FF.Render.getHeight() - ground.rect().height;

			grounds.push(ground);
		}


		//Setup clouds
		for(var i = 0; i < cloud_count; i++){
			var cloud = new FF.Sprite({ image : FF.Util.array_random(possible_clouds) });
			cloud.x = FF.Util.random(0, FF.Render.getWidth() * 2);
			cloud.y = FF.Util.random(clouds_min_y, clouds_max_y);

			clouds.push(cloud);
		}



		//Setup the wonderful Cheezy
		cheezy = new FF.SpriteSheet({ image : "res/img/charsets/player.png", frame_size : [98,66] });
		cheezy.x = FF.Util.getCenterFromItem(cheezy);
		cheezy.y = FF.Render.getHeight() - cheezy.rect().height - ground_sprite.rect().height;


		//Setup Cheezy animation
		cheezy_moves = new FF.SpriteAnimation({ frames : cheezy.frames, frame_duration : 100 });
		cheezy.left = cheezy_moves.merge([0,0,1,1]);
		cheezy.right = cheezy_moves.merge([4,4,5,5]);
		cheezy.setFrame(cheezy.left.next());


		//Setup Cheezy logo
		cheezy_logo = new FF.Sprite({ image : "res/img/logos/cheezy.png" });
		cheezy_logo.x = FF.Util.getCenterFromItem(cheezy_logo);
		cheezy_logo.y = FF.Render.getHeight() - foreground.rect().height;

		cheezy_logo_scaleUp = new FF.Animation(cheezy_logo, 500, { scale : 1.05 });
		cheezy_logo_scaleDown = new FF.Animation(cheezy_logo, 500, { scale : 1 });

		cheezy_logo_scaleUp.addEventListener("end", function(){ cheezy_logo_scaleDown.start(); });
		cheezy_logo_scaleDown.addEventListener("end", function(){ cheezy_logo_scaleUp.start(); });

		cheezy_logo_scaleUp.start();


		//Setup play button
		play_button = new FF.Sprite({ image : "res/img/menu/new_game.png" });
		play_button.x = FF.Util.getCenterFromItem(play_button);
		play_button.y = cheezy_logo.rect().y + cheezy_logo.rect().height + 50;
		play_button.addEventListener("mouseover", function(){ play_button.switchImage("res/img/menu/new_game_hover.png"); });
		play_button.addEventListener("mouseout", function(){ play_button.switchImage("res/img/menu/new_game.png"); });
		play_button.addEventListener("click",function(){ GAME.switchGameState(GS_MAIN, true); });


			//Hey ! What if I add A SPLENDID star onto the previous button, just to have much more swagg ? wow
			star = new FF.Sprite({ image : "res/img/menu/star.png" });
			star.x = play_button.rect().x - star.rect().width / 2;
			star.y = play_button.rect().y + play_button.rect().height / 2 - star.rect().height / 2;


		//Setup settings button
		settings_button = new FF.Sprite({ image : "res/img/menu/settings.png" });
		settings_button.scale = 0.8;
		settings_button.x = FF.Util.getCenterFromItem(settings_button);
		settings_button.y = play_button.rect().y + play_button.rect().height + 15;
		settings_button.addEventListener("mouseover", function(){ settings_button.switchImage("res/img/menu/settings_hover.png"); });
		settings_button.addEventListener("mouseout", function(){ settings_button.switchImage("res/img/menu/settings.png"); });
		settings_button.addEventListener("click", function(){
			GS_SETTINGS.previousCaller = that;
			GAME.switchGameState(GS_SETTINGS);
		});

	};

	this.update = function(){
		if(FF.InputManager.mouse_x > FF.Render.getWidth() / 2) cheezy.setFrame(cheezy.right.next());
		else cheezy.setFrame(cheezy.left.next());

		for(var i in clouds){
			clouds[i].x-= clouds_speed;
			if(clouds[i].x < 0) clouds[i].x = FF.Render.getWidth();
		}

		cheezy_logo_scaleUp.update();
		cheezy_logo_scaleDown.update();

		cheezy_logo.x = FF.Render.getWidth() / 2 - cheezy_logo.rect().width / 2;

		play_button.update();
		settings_button.update();
	};

	this.draw = function(){
		for(var i in backgrounds) backgrounds[i].draw();
		for(var i in clouds) clouds[i].draw();
		foreground.draw();
		for(var i in grounds) grounds[i].draw();

		cheezy.draw();
		cheezy_logo.draw();

		play_button.draw();

		star.draw();
		star.drawSomewhere(star.rect().x + play_button.rect().width, star.rect().y);

		settings_button.draw();
	};

};
