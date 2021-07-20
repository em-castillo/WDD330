//Obstacles sizes and gap between them
minHeight = 40;
maxHeight = 100;
minWidth = 15;
maxWidth = 25;
minGap = 200;
maxGap = 350;
gap = randomGap();


//array of obstacles
let gameObstacles = [];
//obstacles colors
let colors = ["#ffd969", "#f66e69", "#93d171", "#81ccf8"];

let jumping = document.getElementById("jumping");
let crash = document.getElementById("crash");

const apiURL = "https://pokeapi.co/api/v2/pokemon/1";
let imageUrl;
let imageNode;  

const musicURL = "https://open.spotify.com/track/69zAquXKL6nAjiKiHUaV8f?si=02adf85992014fd8";
let gameMusic;



function startGame() {
//get img before starting game
  fetch(apiURL)
    .then((res) => res.json())
    .then((data) => {
        imageUrl = data.sprites.other.dream_world.front_default
        imageNode = new Image();
        imageNode.src = imageUrl
        gameArea.start();
    });
    // fetch(musicURL)
    // .then((res) => res.json())
    // .then((data) => {
    //     mode:"no-cors";
    //     gameMusic = new sound(musicURL);
        
    //     gameArea.start();
    // });
}

function everyinterval(n) {
  //if frame is multiple of n return true, else false
  if (gameArea.frame % n == 0) return true;
  return false;
}

function randomGap() {
  return Math.floor(minGap + Math.random() * (maxGap - minGap + 1));
}

function jump() {
  //-2 moving x axis like jumping
  player.speedY = -2;
  //jump audio
  jumping.play();
}
//game score display
let scoreText = {
  x: 1050,
  y: 50,
  update: function (text) {
    //color
    gameArea.context.fillStyle = "gray";
    //size
    gameArea.context.font = "30px consola";
    //typeface
    gameArea.context.fillText(text, this.x, this.y);
  },
};

//title
let titleText = {
  x: 450,
  y: 60,
  update: function (text) {
    //color
    gameArea.context.fillStyle = "#313030";
    //size
    gameArea.context.font = "40px 'Press Start 2P'";
    //typeface
    gameArea.context.fillText(text, this.x, this.y);
  },
};

//instructions
let guideText = {
  x: 200,
  y: 100,
  update: function (text) {
    //color
    gameArea.context.fillStyle = "#494747";
    //size
    gameArea.context.font = "30px Play";
    //typeface
    gameArea.context.fillText(text, this.x, this.y);
  },
};

let player = {
  x: 20,
  y: 270, 
  speedY: 0,
  update: function () {
    // drawImage(img, x, y, width, height)
    gameArea.context.drawImage(imageNode, this.x, this.y - 20, 50, 50) 
    //player color
    // gameArea.context.fillStyle = "black";
    // gameArea.context.fillRect(this.x, this.y, 50, 50);
  },
  //change y axis position
  newPosition: function () {
    //make player go down if reaches 280
    if (this.y < 280) {
      this.speedY = 2;
    }
    //goes up
    this.y = this.y + this.speedY;
    //stop going down when it reaches 470
    if (this.speedY == 2 && this.y == 470) {
      this.speedY = 0;
    }
  },
  //crashing obstacles
  crashWith: function (obs) {
    if (
      this.x + 50 > obs.x &&
      this.x < obs.x + obs.width &&
      this.y + 30 > obs.y
    ) {
      return true;
    }
    return false;
  },
  
};

function obstacles() {
  //math.random is to set random height and width sizes/ floor gets integer part
  this.height = Math.floor(
    minHeight + Math.random() * (maxHeight - minHeight + 1)
  );
  this.width = Math.floor(minWidth + Math.random() * (maxWidth - minWidth + 1));
  this.x = 1200;
  this.y = gameArea.canvas.height - this.height;
  //random index for colors
  this.index = Math.floor(Math.random() * colors.length);
  this.colors = colors[this.index];

  //drawing the obstacles
  this.draw = function () {
    //obstacle colors
    gameArea.context.fillStyle = this.colors;
    gameArea.context.fillRect(this.x, this.y, this.width, this.height);
    gameArea.context.strokeRect(this.x, this.y, this.width, this.height);
  };
}

//set the area for the game
let gameArea = {
  canvas: document.createElement("canvas"),

  //beginning of game
  start: function () {
    //size 500/1200parts
    this.canvas.height = 500;
    this.canvas.width = 1200;
    //100% width
    this.canvas.style.width = "100%";

    //add canvas to body
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    //context allows to draw
    this.context = this.canvas.getContext("2d");
    //frame counts how many times we run the updateGameArea
    this.frame = 0;
    //score counter
    this.score = 0;
    //initail score
    scoreText.update("Score: 0");
    //5 miliseconds
    this.interval = setInterval(this.updateGameArea, 5);
    window.addEventListener("keydown", jump);
    window.addEventListener("touchend", jump);
    gameMusic.play();
  },

  //game area updated
  updateGameArea: function () {
    //check for a crash
    for (i = 0; i < gameObstacles.length; i++) {
      if (player.crashWith(gameObstacles[i])) {
        crash.play();
        gameArea.stop();
        //exit update game area
        return;
      }
    }
    //clear the game area to start a new obstacle
    gameArea.clear();
    //new obstacle after a gap
    if (everyinterval(gap)) {
      //add one obstacle to the array
      gameObstacles.push(new obstacles());
      //add gap after new obstacle
      gap = randomGap();
      //reset frame
      gameArea.frame = 0;
    }
    for (i = 0; i < gameObstacles.length; i++) {
      //moving x axis to left so it looks like it's going forward
      gameObstacles[i].x -= 1;
      gameObstacles[i].draw();
    }
    //call newPosition
    player.newPosition();
    //call player update
    player.update();
    //increment frame
    gameArea.frame += 1;
    //update score
    gameArea.score += 0.01;
    scoreText.update("Score: " + Math.floor(gameArea.score));
    titleText.update("Jump It");
    guideText.update(
      "Touch the screen or press any key to jump over the obstacles."
    );
  },

  //area cleared
  clear: function () {
    //clearRect clears the canvas
    gameArea.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  //stop game
  stop:  function () {
    clearInterval(this.interval);
    alert("GAME OVER :( \r\nReload to start again :D  ");
    crash.play();
  },
};

//fonts
WebFont.load({
  google: {
    families: ["Press Start 2P", "Play"],
  },
});
