// Enemies our player must avoid


var Enemy = function(x, y, speed) {

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.x = x;
    this.y = y;

    this.width = 70;
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


var Player = function(x, y, speed) {
    this.sprite = 'images/char-cat-girl.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 50;
    this.height = 75;
};


Player.prototype.update = function(dt) {
/*    
    if (this.y < 0) { 
        this.reset (210, 450);
    }
*/
    if (this.y > 0) {
        this.y = this.y --;
    } else {
        this.reset (210, 450);
    }
};

// Draw the enemy on the screen, required method for game
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
var player = new Player(200, 400);

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

