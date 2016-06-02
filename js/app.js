// Whole-script strict mode syntax
"use strict";
// Initialize Global variables
var gameState = "NotStarted"; //Defines state of the game. 
var score = 0; // define score of the game
var lives = 3; // plyaers default lives
var level = 0; // game level
var gemscount = 0; // gems counter 
var playerimg = 'images/char-cat-girl.png'; //default player image
// Initialize tile size constants
var TILE_WIDTH = 101;
var TILE_HEIGHT = 83;
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	
	if (this.x < 505) {
        this.x = this.x + (this.speed * dt);
    } else {
        this.x = -100;
    }
	
		
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our players, this uses
    // a helper we've provided to easily load images
    this.sprite = playerimg;
    this.x = 20 + 120 * (Math.floor(Math.random() * 4)); //randomize x position
    this.y = 350;
    this.speed = 10;
};
// Update the players's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
	this.checkCollisions();
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x * (dt);
    this.y * (dt);
    // this.speed * (dt);

    // Reset player when it reaches the water
    if (this.y <= 0) {
        this.reset();
        level = level + 1;
        score = score + 10;
		console.log('win');
	 }
	
	if (score >40) {
		console.log('GameWin');
		gameState = "GameWin";
	}
	
	
	
	
};
// Draw the player on the screen, required method for game
Player.prototype.render = function() {
	this.renderScoreBoard();
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Check the Collisions wiht Enemies and Gems
Player.prototype.checkCollisions = function() {
        //check collision with enemies
		var len=allEnemies.length;
        for (var i = 0; i < len;  i++) {
            if (this.x < allEnemies[i].x + 50 && this.x + 50 > allEnemies[i].x &&
                this.y < allEnemies[i].y + 50 && this.y + 50 > allEnemies[i].y) {
                console.log('hit');
				this.lives();
				this.reset();
			}
        }
		 		
}
// Reset the player when it loses life or reaches goals.
Player.prototype.reset = function() {
    this.x = 100;
    this.y = 400;
};
// Player moves to water when colliding with princess
Player.prototype.water = function() {
    this.x = 100;
    this.y = 0;
	
	
};
// Player loses life
Player.prototype.lives = function() {
    lives = lives - 1;
	if (lives < 1) {
		console.log('gameover');
		gameState = "GameOver";
	}
};
// This Function render the score on the canvs
Player.prototype.renderScoreBoard = function() {
    // Display Score Board with score, level, lives and game label and initial values
    ctx.fillStyle = '#525c65';
    ctx.fillRect( 0, 0, 505,50);
    ctx.strokeStyle="#FFFFFF";
    ctx.fillStyle = '#000000';
    ctx.font = "16px Arial";
    ctx.strokeText("SCORE: ", 20, 30);
    ctx.strokeText("LEVEL: ", 150, 30);
    ctx.strokeText("LIVE: ", 270, 30);
    ctx.strokeText("GEMS: ", 390, 30);
    ctx.font = "16px Arial";
    ctx.strokeText(score, 100, 30);
    ctx.strokeText(level, 230, 30);
    ctx.strokeText(lives, 340, 30);
    ctx.strokeText(gemscount, 460, 30);
    ctx.save();
};
// This function is for moving the playe
Player.prototype.handleInput = function(key) {
    if (key === 'left' && this.x > 0) {
        this.x -= TILE_WIDTH;
    } else if (key === 'right' && this.x < 395) {
        this.x += TILE_WIDTH;
    } else if (key === 'up' && this.y > 0) {
        this.y -= TILE_HEIGHT;
    } else if (key === 'down' && this.y < 400) {
        this.y += TILE_HEIGHT;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var enemy1 = new Enemy(-100, 60, 250);
var enemy2 = new Enemy(-100, 180, 400);
var enemy3 = new Enemy(-100, 240, 150);
var enemy4 = new Enemy(-100, 120, 300);
var allEnemies = [enemy1, enemy2, enemy3, enemy4];
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
