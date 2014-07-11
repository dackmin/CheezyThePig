/**
 * Global vars
 */
var
	assets,
	GAME,
	GS_INTRO,
	GS_MENU,
	GS_LEVEL_INDEX = 0;


/**
 * Register assets
 */
assets = [

	//MAPS
	"res/maps/level-1-1.tmx",
	"res/maps/level-1-2.tmx",
	"res/maps/level-1-3.tmx",

	//TILESETS
	"res/img/tilesets/main-tileset.png",

	//BACKGROUNDS
	"res/img/parallax/layer-1.png",
	"res/img/parallax/layer-2.png",
	"res/img/parallax/layer-3.png",

	//FONTS
	"res/font/mario.fnt",
	"res/font/skranji.fnt",

	//LOGOS
	"res/img/logos/dackmin.png",
	"res/img/logos/freshflesh.png",

	//MAIN MENU
	"res/img/menu/bg_grasslands.png",
	"res/img/menu/new_game.png",
	"res/img/menu/new_game_hover.png",
	"res/img/menu/settings.png",
	"res/img/menu/settings_hover.png",
	"res/img/menu/cheezy-logo.png",
	"res/img/menu/grassMid.png",

	//PAUSE MENU
	"res/img/pause/bg.png",
	"res/img/pause/resume.png",
	"res/img/pause/settings.png",
	"res/img/pause/menu.png",
	"res/img/pause/quit_bg.png",
	"res/img/pause/cancel_quit.png",
	"res/img/pause/ok_quit.png",

	//SETTINGS
	"res/img/settings/bg.png",
	"res/img/settings/key_bg.png",
	"res/img/settings/music.png",
	"res/img/settings/no_music.png",
	"res/img/settings/sounds.png",
	"res/img/settings/no_sounds.png",

	//HUD
	"res/img/hud/heart_full.png",
	"res/img/hud/heart_half.png",
	"res/img/hud/heart_empty.png",
	"res/img/hud/coins.png",
	"res/img/hud/timer.png",
	"res/img/hud/lives.png",

	//ITEMS
	"res/img/items/coin.png",
	"res/img/items/life.png",

	//ENEMIES
	"res/img/enemies/snail.png",
	"res/img/enemies/fish.png",

	//PLAYER
	"res/img/charsets/player.png"

];


/**
 * Entry point
 */
window.onload = function(){

	//Creating assets loader
	var assetLoader = new FF.AssetLoader(assets);


	//Listen on progress event to show a wonderful loader
	assetLoader.addEventListener("progress", function(e){
		document.getElementById("loader").style.width = ((e.loaded/e.total)*100)+"%";
	});


	//Listen on loaded event to launch the game when everything is loaded
	assetLoader.addEventListener("loaded", function(){

		//Create our gamestates
		GS_INTRO = new IntroGameState();
		GS_SETTINGS = new SettingsGameState();
		GS_MENU = new MenuGameState();
		GS_MAIN = new MainGameState();

		//Then create our fantastic game manager
		GAME = new FF.Game(GS_INTRO, { backgroundColor : "#000" });

		//Then hide our loader and lauch the game
		document.getElementById("loader").style.display = "none";
		GAME.launch();
	});


	//And finally load everything for the game to be able to start properly
	assetLoader.load();

};
