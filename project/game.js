//Obstacles sizes and gap between them
minHeight = 40;
maxHeight = 100;
minWidth = 30;
maxWidth = 60;
minGap = 200;
maxGap = 500;
gap = randomGap();

//array of obstacles
let gameObstacles = [];


function startGame() {
    gameArea.start();
  }

function  everyinterval(n){
    //if frame is multiple of n return true, else false
    if(gameArea.frame % n == 0) return true;
    return false;
}

function randomGap(){
    return Math.floor(minGap + Math.random() * (maxGap - minGap + 1));
}

function jump(){
    //-2 moving x axis like jumping
    player.speedY = -2;
}

let player = {
    x: 20,
    y: 470,
    speedY:0,
    update: function(){
        gameArea.context.fillRect(this.x, this.y, 30, 30);
    },
    //change y axis position
    newPosition: function(){
        //make player go down if reaches 280
        if(this.y < 280){
            this.speedY = 2;
        }
        //goes up
        this.y = this.y + this.speedY;
        //stop going down when it reaches 470
        if(this.speedY == 2 && this.y == 470){
            this.speedY = 0;

        }
    }
}

function obstacles(){
    //math.random is to set random height and width sizes/ floor gets integer part
    this.height = Math.floor(minHeight + Math.random() * (maxHeight-minHeight + 1));
    this.width = Math.floor(minWidth + Math.random() * (maxWidth-minWidth + 1));
    this.x = 1200;
    this.y = gameArea.canvas.height - this.height;

    //drawing the obstacles
    this.draw = function(){
        gameArea.context.fillRect(this.x, this.y, this.width, this.height);
    }

  }

  //set the area for the game
let gameArea = {
    canvas: document.createElement("canvas"),

    //beginning of game
    start: function () {
      this.canvas.height = 500;
      this.canvas.width = 1200;
      //add canvas to body
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      //context allows to draw
      this.context = this.canvas.getContext("2d");
      //frame counts how many times we run the updateGameArea
      this.frame = 0;
      //5 miliseconds
      this.interval = setInterval(this.updateGameArea, 5);
      window.addEventListener("keydown", jump);

    },

    //game area updated 
    updateGameArea: function () {
        //clear the game area to start a new obstacle
        gameArea.clear();
        //new obstacle after a gap
        if(everyinterval(gap)){
            //add one obstacle to the array
            gameObstacles.push(new obstacles());
            //add gap after new obstacle
            gap = randomGap();
            //reset frame
            gameArea.frame = 0;
        }
        for(i=0; i<gameObstacles.length; i++){
            //moving x axis to left so it looks like it's going forward
            gameObstacles[i].x-= 1;
            gameObstacles[i].draw();
        }  
        //call newPosition
        player.newPosition();
        //call player update
        player.update();
        //increment frame
        gameArea.frame += 1;
    },

    //area cleared
    clear: function () {
      //clearRect clears the canvas
      gameArea.context.clearRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    },

    //stop game
    stop: function () {},
  };