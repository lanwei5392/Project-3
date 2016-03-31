//Thsi is enemy class 


var Enemy = function(x, y, speed) {

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.x = x;
    this.y = y;

    this.width = 75;
    this.height = 50;

    this.speed = speed;
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};



// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {

// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.

    if (this.x < 500) {
        this.x += (dt)*this.speed;
    } else {
        this.x = -200;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function(x, y) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var Player = function(x, y) {
    this.sprite = 'images/char-cat-girl.png';
    this.x = x;
    this.y = y;

    this.width = 60;
    this.height = 75;
};


// Draw the player on the screen, required method for game
Player.prototype.render = function(x, y) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var enemy1 = new Enemy(0, 60, 100);
var enemy2 = new Enemy(100, 140, 60);
var enemy3 = new Enemy(40, 220, 80);
var enemy4 = new Enemy(260, 100, 120);
var enemy5 = new Enemy(290, 230, 130);
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];


// Place the player object in a variable called player
var player = new Player(250, 400);


//This is to define where to rest the player when the reset needs to be called by collision or restart the game.
Player.prototype.reset = function() {
    this.x = 250;
    this.y = 400;
};

//This is the collision checking out when the player bumps into an enemy or enemies
Player.prototype.checkCollision = function() {

    for (var i =0; i < 5; i++) {
    if ((this.x > allEnemies[i].x && this.x < allEnemies[i].x + 75 && this.y > allEnemies[i].y && this.y < allEnemies[i].y + 50) 
        || (this.x < allEnemies[i].x && this.x + 60 > allEnemies[i].x && this.y > allEnemies[i].y && this.y < allEnemies[i].y + 50)) {
        this.reset();
        } else {
        this.y --;    
    }
    }
};

//Update the player position with collission check out or restarting the game after the player wins
Player.prototype.update = function() {
    this.checkCollision();
    if (this.y < 0) {
        this.reset();
    }
};


//Manually move the player to different directons
Player.prototype.handleInput = function(key) {
    if (key === "left") {
        this.x -=20;
    }
    else if (key === "right") {
        this.x += 20;
    }
    else if (key === 'up') {
        this.y -= 10;
    }
    else if (key === 'down') {
        this.y += 10;
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

