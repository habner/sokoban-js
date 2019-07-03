/*
  SOKOBAN
  Habner Gerotto
*/

// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', function () {

  // Get canvas elements
  const canvas_bg  = document.getElementById('background');
  const canvas     = document.getElementById('foreground');

  // Get canvas contexts
  const context_bg = canvas_bg.getContext('2d');
  const context    = canvas.getContext('2d');
  context.font   = '12px Arial';

  const image = new Image();
  image.src = 'maps/1.png';
  image.onload = function () { context_bg.drawImage(image, 0, 0); };
  const pikachu = new Image();
  pikachu.src = 'maps/pikachu.png';
  const torchic = new Image();
  torchic.src = 'maps/torchic.png';
  const pokeball = new Image();
  pokeball.src = 'maps/pokeball.png';

  const maps = {
    map:   [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 0, 0, 3, 0, 3, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 4, 4, 1],
                [1, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 1],
                [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 2, 1, 1, 0, 0, 4, 4, 1],
                [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
    init: { x: 11, y: 12 }
  };

  function Game () {}

  Game.prototype.init = function () {
    this.sizeX = 19;
    this.sizeY = 19;
    this.size = 16;
    this.x = maps.init.x;
    this.y = maps.init.y;
    this.count = 0;
    block.size = this.size;
    this.map = [];
    for (let y = 0; y < this.sizeY; y++) {
      const row = [];
      for (let x = 0; x < this.sizeX; x++) {
        row.push(maps.map[y][x]);
        if (maps.map[y][x] === 2) {
          maps.init.x = x;
          maps.init.y = y;
        }
      }
      this.map.push(row);
    }
    this.draw();
  };

  Game.prototype.draw = function () {
    context.clearRect(0, 0, this.sizeX * this.size, this.sizeY * this.size);
    let boxes = 0;
    for (let y = 0; y < this.sizeY; y++) {
      for (let x = 0; x < this.sizeX; x++) {
        block.draw(x, y, this.map[y][x]);
        if (this.map[y][x] === 3) {
          boxes++;
        }
      }
    }
    moves.innerHTML = this.count;
    context.fillText(this.count, 10, 10);
    if (boxes) {
      context.fillText('You won!', 0, 0);
    } else { msg.innerHTML = ''; }
  };

  Game.prototype.moveUp = function () {
    if (this.y !== 0) {
      if (this.map[this.y - 1][this.x] === 0 || this.map[this.y - 1][this.x] === 4) {
        this.map[this.y][this.x] = (maps.map[this.y][this.x] === 4) ? 4 : 0;
        this.map[this.y - 1][this.x] = 2;
        this.y--;
        this.count++;
      } else if ((this.map[this.y - 1][this.x] === 3 || this.map[this.y - 1][this.x] === 5) && this.y - 2 >= 0) {
        if (this.map[this.y - 2][this.x] === 0) {
          this.map[this.y][this.x] = (maps.map[this.y][this.x] === 4) ? 4 : 0;
          this.map[this.y - 1][this.x] = 2;
          this.map[this.y - 2][this.x] = 3;
          this.y--;
          this.count++;
        } else if (this.map[this.y - 2][this.x] === 4) {
          this.map[this.y][this.x] = (maps.map[this.y][this.x] === 4) ? 4 : 0;
          this.map[this.y - 1][this.x] = 2;
          this.map[this.y - 2][this.x] = 5;
          this.y--;
          this.count++;
        }
      }
    }
    this.draw();
  };

  Game.prototype.moveDown = function () {
    if (this.y !== this.sizeY - 1) {
      if (this.map[this.y + 1][this.x] === 0 || this.map[this.y + 1][this.x] === 4) {
        this.map[this.y][this.x] = (maps.map[this.y][this.x] === 4) ? 4 : 0;
        this.map[this.y + 1][this.x] = 2;
        this.y++;
        this.count++;
      } else if ((this.map[this.y + 1][this.x] === 3 || this.map[this.y + 1][this.x] === 5) && this.y + 2 >= 0) {
        if (this.map[this.y + 2][this.x] === 0) {
          this.map[this.y][this.x] = (maps.map[this.y][this.x] === 4) ? 4 : 0;
          this.map[this.y + 1][this.x] = 2;
          this.map[this.y + 2][this.x] = 3;
          this.y++;
          this.count++;
        } else if (this.map[this.y + 2][this.x] === 4) {
          this.map[this.y][this.x] = (maps.map[this.y][this.x] === 4) ? 4 : 0;
          this.map[this.y + 1][this.x] = 2;
          this.map[this.y + 2][this.x] = 5;
          this.y++;
          this.count++;
        }
      }
    }
    this.draw();
  };

  Game.prototype.moveLeft = function () {
    const x = this.x;
    const y = this.y;
    if (x !== 0) {
      if (this.map[y][x - 1] === 0 || this.map[y][x - 1] === 4) {
        this.map[y][x] = (maps.map[y][x] === 4) ? 4 : 0;
        this.map[y][x - 1] = 2;
        this.x--;
        this.count++;
      } else if ((this.map[y][x - 1] === 3 || this.map[y][x - 1] === 5) && x - 2 >= 0) {
        if (this.map[y][x - 2] === 0) {
          this.map[y][x] = (maps.map[y][x] === 4) ? 4 : 0;
          this.map[y][x - 1] = 2;
          this.map[y][x - 2] = 3;
          this.x--;
          this.count++;
        } else if (this.map[y][x - 2] === 4) {
          this.map[y][x] = (maps.map[y][x] === 4) ? 4 : 0;
          this.map[y][x - 1] = 2;
          this.map[y][x - 2] = 5;
          this.x--;
          this.count++;
        }
      }
    }
    this.draw();
  };

  Game.prototype.moveRight = function () {
    const x = this.x;
    const y = this.y;
    if (x !== this.sizeX - 1) {
      if (this.map[y][x + 1] === 0 || this.map[y][x + 1] === 4) {
        this.map[y][x] = (maps.map[y][x] === 4) ? 4 : 0;
        this.map[y][x + 1] = 2;
        this.x++;
        this.count++;
      } else if ((this.map[y][x + 1] === 3 || this.map[y][x + 1] === 5) && x + 2 !== this.sizeX) {
        if (this.map[y][x + 2] === 0) {
          this.map[y][x] = (maps.map[y][x] === 4) ? 4 : 0;
          this.map[y][x + 1] = 2;
          this.map[y][x + 2] = 3;
          this.x++;
          this.count++;
        } else if (this.map[y][x + 2] === 4) {
          this.map[y][x] = (maps.map[y][x] === 4) ? 4 : 0;
          this.map[y][x + 1] = 2;
          this.map[y][x + 2] = 5;
          this.x++;
          this.count++;
        }
      }
    }
    this.draw();
  };

  function Block () {}

  Block.prototype.draw = function (x, y, type) {
    if (type === 0) { return; }
    if (type === 1) { return; }
    if (type === 2) { this.img = pikachu; }
    if (type === 3) { this.img = torchic; }
    if (type === 4) { return; }
    if (type === 5) { this.img = pokeball; }
    context.drawImage(this.img, x * this.size, y * this.size);
  };

  const game = new Game();
  const block = new Block();
  const moves = document.getElementById('moves');
  const msg = document.getElementById('msg');
  const restartbtn = document.querySelector('button');
  window.setTimeout(function() {game.init(); }, 1000);
  document.addEventListener('keydown', function(e) {
    e.preventDefault();
    if (e.keyCode === '37') { game.moveLeft(); }
    else if (e.keyCode === '38') { game.moveUp(); }
    else if (e.keyCode === '39') { game.moveRight(); }
    else if (e.keyCode === '40') { game.moveDown(); }
  });
  restartbtn.addEventListener('click', function() { game.init(); });
  document.getElementById('left').addEventListener('touchstart', function(e) { e.preventDefault(); game.moveLeft(); });
  document.getElementById('up').addEventListener('touchstart', function(e) { e.preventDefault(); game.moveUp(); });
  document.getElementById('down').addEventListener('touchstart', function(e) { e.preventDefault(); game.moveDown(); });
  document.getElementById('right').addEventListener('touchstart', function(e) { e.preventDefault(); game.moveRight(); });
});
