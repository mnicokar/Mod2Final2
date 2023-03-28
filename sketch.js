
//12.19.2022 around 6:30pm
const WIDTH= 600;
const HEIGHT = 400;

var gameState = 0;

var pointLoss = 1;

var isBlue = 0; 

var winningPlayer = "no one";

//Paddle Size
var rectWidth = 20;
var rectHeight = 60;

//p1 is the AI
var p1x = 20;
var p1y = 170;

var p1YSpeed = 3;
var p1Health = 7;

//p2 is us
var p2x = 560;
var p2y = 170;

var p2Health = 7;


var p2YSpeed = 3.5;

//ellipse/ball setup


var r = Math.floor(Math.random()*256) 
var g = Math.floor(Math.random()*256) 
var b = Math.floor(Math.random()*256) 

var circleRadius = 30;
var xSpeed = Math.floor(Math.random()*4) - 2;

while (xSpeed === 0 ){
  xSpeed = Math.floor(Math.random()*4) - 2;
}

var ySpeed = Math.floor(Math.random()*4) - 2;

let ball1, ball2;
let ballz = [];

function setup() {
  bg = loadImage("bg.jpg");
  createCanvas(WIDTH, HEIGHT);
  ball1 = new Ball(300, 200, circleRadius);
  ball2 = new Ball(100, 200, circleRadius);

  ballz.push(ball1);
  ballz.push(ball2);
}


//function to randomize color. 
function changeColor(){
  r = Math.floor(Math.random()*256) 
  g = Math.floor(Math.random()*256) 
  b = Math.floor(Math.random()*256) 
  fill(r,g,b)
}

function keyPressed(){
  if (keyCode === ENTER){
    gameState = 1;
    p1Health = 7;
    p2Health = 7;
  }
}


menuTextX = 0;
menuTextY = 200;
gap = 30;


function draw() {

  textSize(30);
  background(bg);


  if (gameState == 0){
    text("Welcome to Pong!", menuTextX, menuTextY)
    
    text("Move blue paddle with up/down arrow key", menuTextX, menuTextY + gap)
    
    text("Press Enter to play!", menuTextX, menuTextY + (gap*2))
  }

  else if (gameState ==1){
    
    //make player paddle blue
    fill(0,0,255)
    rect(p2x,p2y,rectWidth,rectHeight);
    
    fill(255,0,0)
    rect(p1x,p1y,rectWidth,rectHeight);
    

    fill(255);
    text("Health " + p2Health, 460,380);
    text("Health " + p1Health, 30,380);

    if (keyIsPressed){
      if (keyCode == UP_ARROW){
        p2YSpeed = -3.5
      }
      else if (keyCode == DOWN_ARROW){
        p2YSpeed = 3.5
      }
    }

    p2y += p2YSpeed;
    console.log(p2YSpeed);
    if (p1Health === 0){
      gameState = 2;
      winningPlayer = "Blue"
    }
    else if (p2Health === 0){
      gameState = 2;
      winningPlayer = "Red"
    }
    
    if (isBlue === 0){
      fill(255,255,255)
    }
    else if (isBlue === 1){
      fill(255,0,0)
    }
    else if (isBlue === 2){
      fill(0,0,255)
    }


    for (let ball of ballz){
      ellipse(ball.getX, ball.getY,circleRadius,circleRadius);

      //move ball
      //console.log(xSpeed);
      
      ball.changeX = ball.getX + xSpeed;
      ball.changeY = ball.getY + ySpeed;

      //check ball collision with outside bounds
      if (ball.getY +15 >= HEIGHT){
        ySpeed = -ySpeed;
      }
      else if (ball.getY -15 <= 0){
        ySpeed = -ySpeed;
      }
      else if (ball.getX + 15 >= WIDTH){
        xSpeed = -Math.ceil(Math.random()*4);
        p2Health -= pointLoss
        ball.changeX = 300;
        ball.changeY = 200;
        isBlue = 0;
      }
      else if (ball.getX -15 <= 0){
        xSpeed = Math.ceil(Math.random()*4);
        ball.changeX = 300;
        ball.changeY = 200;
        p1Health -= pointLoss
        isBlue = 0;
        
      }

      //Following the ball up and down
      //check if the center of the paddle is below the ball

      if ((p1y + (rectHeight/2)) < ball.getY){
        p1y += p1YSpeed;
      }
      
      if ((p1y + (rectHeight/2)) > ball.getY){
        p1y -= p1YSpeed;
      }

        //AI Paddle Collision
      if(ball.getX - (circleRadius/2) <= p1x + rectWidth && (ball.getY >= p1y && ball.getY <= (p1y + rectHeight))){
        xSpeed = - xSpeed;
        ySpeed = Math.floor(Math.random()*5) - 2;
        xSpeed = Math.ceil(Math.random()*10);
        ball.changeX = ball.getX + xSpeed;
        

        //changeColor();
        isBlue = 1;
        
      }
      

      // Checking for collision with the right paddle by looking at the upper bound and lower bound of the paddle and making sure the ball is within that range and also at the xPosition where the paddle is
      //Player Paddle Collision
      if(ball.getX + (circleRadius/2) >= p2x && (ball.getY >= p2y && ball.getY <= p2y + rectHeight)){
        ySpeed = Math.floor(Math.random()*8) - 2;
        xSpeed = -Math.ceil(Math.random()*10);
        ball.changeX = ball.getX -1;
        //changeColor();
        isBlue = 2;
      }

    }
  }
  // announce winner
  else if (gameState === 2){
    text(winningPlayer + " paddle wins the game!", menuTextX, menuTextY)
    text("Press Enter to play!", menuTextX, menuTextY + (gap*2))
  }


}

