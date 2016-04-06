
// Enable this js file to strict mode
'use strict';
// This is a superclass to define a character
var Character = function(x, y) {
    'use strict';
    this.x = x;
    this.y = y;
};
Character.prototype.render = function(x, y) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Define an enemy sise
var enemywidth = 90;
var enemyheight = 60;

// Define a player size
var playerwidth = 60;
var playerheight = 75;

// Use the superclass to define an enemy

var Enemy = function(x, y, speed) {

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    Character.call(this, x, y);
    this.width = enemywidth;
    this.height = enemyheight;
    this.speed = speed;
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Use Character, the superclass prototype to construct and render Enemies that are defiend in the subclass.

Enemy.prototype = Object.create(Character.prototype);

Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {

// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.

    if (this.x < 590) {
        this.x += (dt)*this.speed;
    } else {
        this.x = -200;
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Use Charcter, the superclass to construct a Player in a subclass

var Player = function(x, y) {

    Character.call(this, x, y);
    this.width = playerwidth;
    this.height = playerheight;
    this.sprite = 'images/char-cat-girl.png';
};

// Use the Character, the supoerclass to construct and render the player defined in the subclass
Player.prototype = Object.create(Character.prototype);

Player.prototype.constructor = Player;


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var enemy1 = new Enemy(0, 60, 100);
var enemy2 = new Enemy(100, 140, 120);
var enemy3 = new Enemy(40, 220, 150);
var enemy4 = new Enemy(260, 100, 130);
var enemy5 = new Enemy(290, 230, 110);
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];


// Place the player object in a variable called player
var player = new Player(250, 500);

// This is to define where to rest the player when the reset needs to be called by collision or restart the game.
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 500;
};

// This is the collision checking out when the player bumps into an enemy or enemies
Player.prototype.checkCollision = function() {

    for (var i =0; i < 5; i++) {
        if ((this.x > allEnemies[i].x && this.x < allEnemies[i].x + 90 && this.y > allEnemies[i].y && this.y < allEnemies[i].y + 60) || 
            (this.x < allEnemies[i].x && this.x + 60 > allEnemies[i].x && this.y > allEnemies[i].y && this.y < allEnemies[i].y + 60)) {
            this.reset(); 

        } else if ((this.x > 550) || (this.x < -50) || (this.y > 590)) {
            this.reset();  
        }  
    }
};

// Update the player position with collission check out or restarting the game after the player wins
Player.prototype.update = function() {
    this.checkCollision();
    if (this.y < -10) {
        this.reset();
    }
};


// Manually move the player to different directons
Player.prototype.handleInput = function(key) {
    if (key === "left") 
    {
        this.x -=101;
    }
    else if (key === "right") 
    {
        this.x += 101;
    }
    else if (key === 'up') 
    {
        this.y -= 40;
    }
    else if (key === 'down') 
    {
        this.y += 40;
    }
};

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

