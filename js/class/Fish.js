function Fish(map, object){

	var sprite = new FF.SpriteSheet({
		image : "res/img/enemies/fish.png",
		frame_size : [70,70],
		x : object.rect().x,
		y : map.rect().height
	});


	var sprite_anim = new FF.SpriteAnimation({ frames : sprite.frames, frame_duration : 200 });
	sprite.anim_left = sprite_anim.slice(0,2);
	sprite.anim_right = sprite_anim.slice(2,4);


	var scale_up = new FF.Animation(sprite, 1000, { y : sprite.rect().y - object.properties["jumping"] * object.rect().height, ease : "easeOutQuad" });
		scale_up.addEventListener("end", function(){ scale_down.start(); });
		scale_up.addEventListener("step", function(){ sprite.setFrame(sprite.anim_left.next()); });
	var scale_down = new FF.Animation(sprite, 1000, { y : object.rect().y + (parseInt(object.properties["jumping"]) * object.rect().height), ease : "easeInQuad" });
		scale_down.addEventListener("end", function(){ scale_up.start(); });
		scale_down.addEventListener("step", function(){ sprite.setFrame(sprite.anim_right.next()); });

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


	this.getType = function(){ return "fish"; };


	this.getSprite = function(){
		return sprite;
	};

};
