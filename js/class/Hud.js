function HUD(_player, _timer){
    FF.EventManager.call(this);
    var that = this, timer = _timer, paused = false;


    //GENERATING HEARTS
    var life_hearts = [], number_of_hearts = 3;
    for(var i = 0; i < number_of_hearts; i++)
        life_hearts.push(new FF.Sprite({ image : "res/img/hud/heart_full.png", scale : 0.5, x : 10 + 30*i, y : 10 }));


    //GENERATING MONEY
    var coin_sprite = new FF.Sprite({ image : "res/img/hud/coins.png", scale : 0.5, y : 10 });
    var coin_text = new FF.BitmapText({ text : "x"+_player.getCoins(), fontFamily : "Skranji", fontSize : 25, y : 10 });


    //GENERATING SCORE
    var score_text = new FF.BitmapText({ text : "00000000", fontFamily : "Skranji", fontSize : 25, x : 150, y : 10 });


    //GENERATING LIVES
    var life_sprite = new FF.Sprite({ image : "res/img/hud/lives.png", scale : 0.5, y : 10 });
    var life_text = new FF.BitmapText({ text : "x"+_player.getLives(), fontFamily : "Skranji", fontSize : 25, y : 10 });


    //GENERATING TIME
    var time_sprite = new FF.Sprite({ image : "res/img/hud/timer.png", y : 10 });
        time_sprite.x = FF.Util.getCenterFromItem(time_sprite);

    var time_text = new FF.BitmapText({ text : 180, fontFamily : "Skranji", fontSize : 25, y : 22 });
    _timer.addEventListener("tick",function(e){ time_text.setText((e.remaining / 1000).toFixed(1)); });


    this.update = function(){
        paused = false;


        //UPDATING HEARTS
        switch(_player.getHearts()){
            case 6 :
                life_hearts[2].switchImage("res/img/hud/heart_full.png");
                life_hearts[1].switchImage("res/img/hud/heart_full.png");
                life_hearts[0].switchImage("res/img/hud/heart_full.png");
                break;
            case 5 :
                life_hearts[2].switchImage("res/img/hud/heart_half.png");
                life_hearts[1].switchImage("res/img/hud/heart_full.png");
                life_hearts[0].switchImage("res/img/hud/heart_full.png");
                break;
            case 4 :
                life_hearts[2].switchImage("res/img/hud/heart_empty.png");
                life_hearts[1].switchImage("res/img/hud/heart_full.png");
                life_hearts[0].switchImage("res/img/hud/heart_full.png");
                break;
            case 3 :
                life_hearts[2].switchImage("res/img/hud/heart_empty.png");
                life_hearts[1].switchImage("res/img/hud/heart_half.png");
                life_hearts[0].switchImage("res/img/hud/heart_full.png");
                break;
            case 2 :
                life_hearts[2].switchImage("res/img/hud/heart_empty.png");
                life_hearts[1].switchImage("res/img/hud/heart_empty.png");
                life_hearts[0].switchImage("res/img/hud/heart_full.png");
                break;
            case 1 :
                life_hearts[2].switchImage("res/img/hud/heart_empty.png");
                life_hearts[1].switchImage("res/img/hud/heart_empty.png");
                life_hearts[0].switchImage("res/img/hud/heart_half.png");
                break;
            case 0 :
                life_hearts[2].switchImage("res/img/hud/heart_empty.png");
                life_hearts[1].switchImage("res/img/hud/heart_empty.png");
                life_hearts[0].switchImage("res/img/hud/heart_empty.png");
                break;
            default :
                life_hearts[2].switchImage("res/img/hud/heart_full.png");
                life_hearts[1].switchImage("res/img/hud/heart_full.png");
                life_hearts[0].switchImage("res/img/hud/heart_full.png");
                break;
        }


        //UPDATING TIME
        time_text.x = FF.Util.getCenterFromItem(time_text);


        //UPDATING COINS
        coin_text.setText("x"+_player.getCoins());
        coin_text.x = FF.Render.getWidth() - coin_text.rect().width - 20;
        coin_sprite.x = coin_text.rect().x - coin_sprite.rect().width - 10;


        //UPDATING LIVES
        life_text.setText("x"+_player.getLives());
        life_text.x = coin_sprite.rect().x - life_text.rect().width - 20;
        life_sprite.x = life_text.rect().x - life_sprite.rect().width - 10;


        //UPDATING SCORE
        if(_player.getScore() < 10) score_text.setText("0000000"+_player.getScore());
        else if(_player.getScore() < 100) score_text.setText("000000"+_player.getScore());
        else if(_player.getScore() < 1000) score_text.setText("00000"+_player.getScore());
        else if(_player.getScore() < 10000) score_text.setText("0000"+_player.getScore());
        else if(_player.getScore() < 100000) score_text.setText("000"+_player.getScore());
        else if(_player.getScore() < 1000000) score_text.setText("00"+_player.getScore());
        else if(_player.getScore() < 10000000) score_text.setText("0"+_player.getScore());
        else score_text.setText(""+_player.getScore());
    };

    this.draw = function(){
        for(var i in life_hearts) life_hearts[i].draw();

        time_sprite.draw();
        time_text.draw();

        coin_sprite.draw();
        coin_text.draw();

        life_sprite.draw();
        life_text.draw();

        score_text.draw();
    };

    this.pause = function(){
        paused = true;
    };

};
