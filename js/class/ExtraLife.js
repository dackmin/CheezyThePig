function ExtraLife(object){

	var sprite = new FF.Sprite({ image : "res/img/items/life.png", x : object.rect().x, y : object.rect().y });

	this.rect = function(){
		return {
			x : sprite.rect().x + 21,
			y : sprite.rect().y + 37,
			width : 29,
			height : 29
		};
	};

	this.getType = function(){
		return "extra_life";
	};

	this.getSprite = function(){
		return sprite;
	};
};
