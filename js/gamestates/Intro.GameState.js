function IntroGameState(){

	var logo1, anim1_up, anim1_down, logo2, anim2_up, anim2_down, waitTimer;

	this.setup = function(){

		//DACKMIN logo
		logo1 = new FF.Sprite({ image : "res/img/logos/dackmin.png" });
		logo1.x = FF.Render.getWidth() / 2  - logo1.rect().width / 2;
		logo1.y = FF.Render.getHeight() / 2  - logo1.rect().height / 2;
		logo1.alpha = 0;

		anim1_up = new FF.Animation(logo1, 500, { opacity : 1 });
		anim1_up.addEventListener("end", function(){
			setTimeout(function(){ anim1_down.start(); }, 2000);
		});

		anim1_down = new FF.Animation(logo1, 500, { opacity:0 });
		anim1_down.addEventListener("end", function(){
			anim2_up.start();
		});

		//FRESHFLESH LOGO
		logo2 = new FF.Sprite({ image : "res/img/logos/freshflesh.png" });
		logo2.x = FF.Render.getWidth() / 2  - logo2.rect().width / 2;
		logo2.y = FF.Render.getHeight() / 2  - logo2.rect().height / 2;
		logo2.alpha = 0;

		anim2_up = new FF.Animation(logo2, 500, { opacity : 1 });
		anim2_up.addEventListener("end", function(){
			setTimeout(function(){ anim2_down.start(); }, 2000);
		});

		anim2_down = new FF.Animation(logo2, 500, { opacity:0 });
		anim2_down.addEventListener("end", function(){
		});

		anim1_up.start();
	};

	this.update = function(){
		anim1_up.update();
		anim1_down.update();
		anim2_up.update();
		anim2_down.update();
	};

	this.draw = function(){
		logo1.draw();
		logo2.draw();
	};

};
