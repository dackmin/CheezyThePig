function Snail(object){


	var sprite = new FF.SpriteSheet({
		image : "res/img/enemies/snail.png",
		frame_size : [70,70],
		x : object.rect().x,
		y : object.rect().y
	});


	var sprite_anim = new FF.SpriteAnimation({ frames : sprite.frames, frame_duration : 200 });
	sprite.anim_left = sprite_anim.slice(0,2);
	sprite.anim_right = sprite_anim.slice(2,4);


	var scale_up = new FF.Animation(sprite, 2000, { x : object.rect().x + parseInt(object.properties["moving_to"]) * object.rect().width });
		scale_up.addEventListener("end", function(){ scale_down.start(); });
        scale_up.addEventListener("step", function(){ sprite.setFrame(sprite.anim_right.next()); });
	var scale_down = new FF.Animation(sprite, 2000, { x : object.rect().x });
		scale_down.addEventListener("end", function(){ scale_up.start(); });
        scale_down.addEventListener("step", function(){ sprite.setFrame(sprite.anim_left.next()); });

    scale_up.start();


	this.update = function(){
		scale_up.update();
		scale_down.update();
	};


	this.rect = function(){
		return {
			x : sprite.rect().x + 7,
			y : sprite.rect().y + 40,
			width : 55,
			height : 30
		};
	};


	this.getType = function(){
		return "snail";
	};


	this.getSprite = function(){
		return sprite;
	};

};