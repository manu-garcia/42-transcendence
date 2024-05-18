import { Component, Input, OnInit } from '@angular/core';
import { IEventMatch } from 'shared/event/event';

import { IUser } from 'shared/user/user';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  @Input() users: IUser[];
  @Input() match: IEventMatch;

  ngOnInit(): void {
    // Start game
    InitGame(this.match);
  }
}

// Class for the objects of the board
class edges {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  constructor(minX, maxX, minY, maxY) {
    this.minX = minX;
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;
  }
}

// Class for the moving objects of the game
class MovingObject {
  boardEdges: edges;
  vel: number;
  x: number;
  y: number;
  width: number;
  height: number;
  elem: HTMLElement;

  constructor(boardEdges, elem, vel) {
    this.boardEdges = boardEdges;
    this.vel = vel;
    this.x = parseInt(getComputedStyle(elem).left);
    this.y = parseInt(getComputedStyle(elem).bottom);
    this.width = parseInt(getComputedStyle(elem).width);
    this.height = parseInt(getComputedStyle(elem).height);
    this.elem = elem;
  }

  // Method to get the edges of the object
  GetEdges() {
    return new edges(
      this.x - this.width / 2,
      this.x + this.width / 2,
      this.y - this.height / 2,
      this.y + this.height / 2
    );
  }

  // Method to reset the object
  ResetMovingObject() {
    this.width = parseInt(getComputedStyle(this.elem).width);
    this.height = parseInt(getComputedStyle(this.elem).height);
  }
}

// Class for the ball
class Ball extends MovingObject {
  dirX: number;
  dirY: number;
  drag: number;

  constructor(boardEdges, elem, vel, dirX, dirY, drag) {
    super(boardEdges, elem, vel);
    this.dirX = dirX;
    this.dirY = dirY;
    this.drag = drag;
  }

  // Method to move the ball
  Move() {
    this.x += this.dirX * this.vel * deltaTime;
    this.y += this.dirY * this.vel * deltaTime;
    this.elem.style.left = this.x + 'px';
    this.elem.style.bottom = this.y + 'px';
    this.CheckBounce();
  }

  // Method to check and manage the bounce of the ball on the edges
  CheckBounce() {
    // BOTTOM BOUNCE
    if (this.y + this.height / 2 > this.boardEdges.maxY && this.dirY > 0) {
      this.BounceY();
      // UPPER BOUNCE
    } else if (this.y - this.height / 2 < this.boardEdges.minY && this.dirY < 0) {
      this.BounceY();
    }
  }

  // Method to manage bounce in the X axis
  BounceX(paddleInertia, deviation) {
    this.dirY += deviation;
    this.dirY += paddleInertia * this.drag;
    this.dirX = -this.dirX;
  }

  // Method to manage bounce in the Y axis
  BounceY() {
    this.dirY = -this.dirY;
  }

  // Method to check if the ball has entenet the goal and return the player who won the point
  CheckGoal() {
    if (this.x - this.width / 2 < this.boardEdges.minX) {
      return 2;
    } else if (this.x + this.width / 2 > this.boardEdges.maxX) {
      return 1;
    }
    return 0;
  }

  // Method to Reset the ball
  Reset(vel, x, y, dirX, dirY) {
    this.vel = vel;
    this.x = x;
    this.y = y;
    this.dirX = dirX;
    this.dirY = dirY;
    super.ResetMovingObject();
  }
}

// Class for the paddles
class paddle extends MovingObject {
  keyboard: Keyboard;
  actualSpeed: number;
  friction: number;
  keyCodeUp: string;
  keyCodeDown: string;

  constructor(boardEdges, elem, vel, friction, keyboard, keyCodeUp, keyCodeDown) {
    super(boardEdges, elem, vel);
    this.keyboard = keyboard;
    this.actualSpeed = 0;
    this.friction = friction;
    this.keyCodeUp = keyCodeUp;
    this.keyCodeDown = keyCodeDown;
  }

  // Method to move the paddle
  Move() {
    // Check pressed keys and adjust current speed
    if (this.keyboard.isPressed(this.keyCodeUp)) {
      this.actualSpeed = this.vel;
    } else if (this.keyboard.isPressed(this.keyCodeDown)) {
      this.actualSpeed = -this.vel;
    }

    // Move the paddle and prevent it from leaving the board
    this.y += this.actualSpeed * deltaTime;
    if (this.y + this.height / 2 > this.boardEdges.maxY) this.y = this.boardEdges.maxY - this.height / 2;
    if (this.y - this.height / 2 < this.boardEdges.minY) this.y = this.height / 2;
    this.elem.style.bottom = this.y + 'px';
  }

  // Method to manage the progressive braking of the paddle
  ProgressiveStop() {
    if (!this.keyboard.isPressed(this.keyCodeUp) && !this.keyboard.isPressed(this.keyCodeDown)) {
      this.actualSpeed /= this.friction;
      if (Math.abs(this.actualSpeed) < 1) this.actualSpeed = 0;
    }
  }

  // Method to check collision with another object
  CheckColision(edges2) {
    var edges1 = this.GetEdges();
    return !(
      edges1.maxX < edges2.minX ||
      edges1.minX > edges2.maxX ||
      edges1.maxY < edges2.minY ||
      edges1.minY > edges2.maxY
    );
  }

  // Method to calculate the deviation in the Y axis when hitting the ball
  CheckDeviationY(edges2) {
    var edges1 = this.GetEdges();
    var middle2Y = (edges2.maxY + edges2.minY) / 2;
    var relativePos = (middle2Y - edges1.minY) / (edges1.maxY - edges1.minY);
    return relativePos * 2 - 1;
  }
}

// Class for the Scoreboard
class Scoreboard {
  elem: HTMLElement;
  points: number;
  constructor(elem) {
    this.elem = elem;
    this.points = 0;
  }

  // Method to increase points and update the Scoreboard
  ScorePoint() {
    this.points++;
    this.elem.innerHTML = '' + this.points;
  }
}

// Class to manage the keyboard
class Keyboard {
  pressedKeys: Object;
  constructor() {
    this.pressedKeys = {};
    document.addEventListener('keydown', this.keyPressed.bind(this));
    document.addEventListener('keyup', this.keyReleased.bind(this));
  }

  // Method to register the key pressed
  keyPressed(evento) {
    if (evento.key === 'ArrowUp' || evento.key === 'ArrowDown') {
      evento.preventDefault();
    }
    this.pressedKeys[evento.key] = true;
  }

  // Method to register the release of a key
  keyReleased(evento) {
    this.pressedKeys[evento.key] = false;
  }

  // Method to check if a key is pressed
  isPressed(tecla) {
    return !!this.pressedKeys[tecla];
  }
}

// Function to generate a random motion direction in radians
function RandDir() {
  // Array with motion direction options in radians
  var optionsDir = [
    Math.PI / 4, // 45 degrees
    (3 * Math.PI) / 4, // 135 degrees
    (5 * Math.PI) / 4, // 225 degrees
    (7 * Math.PI) / 4, // 315 degrees
  ];
  var randomIndex = Math.floor(Math.random() * optionsDir.length);
  return optionsDir[randomIndex];
}

// Update function that is called in each frame
function Update() {
  ball.Move();
  MovePaddles();
  CheckPaddleCollision();
  CheckGoal();
}

// Function to move the paddles
function MovePaddles() {
  paddle1.Move();
  paddle1.ProgressiveStop();
  paddle2.Move();
  paddle2.ProgressiveStop();
}

// Function to check collisions with the paddles
function CheckPaddleCollision() {
  var ballEdges = ball.GetEdges();
  if (paddle1.CheckColision(ballEdges)) {
    if (ball.dirX < 0) {
      var deviation = paddle1.CheckDeviationY(ballEdges);
      ball.BounceX(paddle1.actualSpeed * deltaTime, deviation);
    }
  } else if (paddle2.CheckColision(ballEdges)) {
    if (ball.dirX > 0) {
      var deviation = paddle2.CheckDeviationY(ballEdges);
      ball.BounceX(paddle2.actualSpeed * deltaTime, deviation);
    }
  }
}

// Function to check if there is a goal
function CheckGoal() {
  var result = ball.CheckGoal();
  if (result != 0) {
    if (result == 1) {
      scoreboard1.ScorePoint();
    } else if (result == 2) {
      scoreboard2.ScorePoint();
    }
    ResetGame();
  }
}

// Game restart function
function ResetGame() {
  paddle1.ResetMovingObject();
  paddle2.ResetMovingObject();
  var dir = RandDir();
  // Calculate half the width and height of the scenario
  var halfWidthScenario = scenarioElem.offsetWidth / 2;
  var halfHeightScenario = scenarioElem.offsetHeight / 2;
  ball.Reset(300, halfWidthScenario, halfHeightScenario, Math.cos(dir), Math.sin(dir));
}

// VARIABLES OF THE GAME
// TODO: Replace any with Element here, and fix the missing property offsetWidth
let scenarioElem: any;
var styles;
var boardEdges;
var dir;
var ball;
var keyboard;
var paddle1;
var paddle2;
var scoreboard1;
var scoreboard2;
var time;
var deltaTime;

// Function that inits game variables
function InitGame( match: IEventMatch ) {
  // Check if we have a match and print it
  if (match) {
    console.log('Match:', match);
  } else {
    // Handle error if match is null or undefined
    console.error('No match data available.');
  }
  scenarioElem = document.querySelector('.scenario');
  styles = ['tecno', 'florido', 'neon', 'loco'];
  keyboard = new Keyboard();
  boardEdges = new edges(0, scenarioElem.offsetWidth, 0, scenarioElem.offsetHeight); 
  dir = RandDir();
  ball = new Ball(boardEdges, document.querySelector('.ball'), 300, Math.cos(dir), Math.sin(dir), 0.1);
  paddle1 = new paddle(boardEdges, document.querySelector('.paddle1'), 400, 1.15, keyboard, 'w', 's');
  paddle2 = new paddle(boardEdges, document.querySelector('.paddle2'), 400, 1.15, keyboard, 'ArrowUp', 'ArrowDown');
  scoreboard1 = new Scoreboard(document.querySelector('.scoreboard1'));
  scoreboard2 = new Scoreboard(document.querySelector('.scoreboard2'));
  time = Date.now();
  deltaTime = 0;

  // Event listener for the 'keydown' event that detects when the space bar is pressed
  document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
      // Check if the key pressed is the space bar
      // Change the appearance of the game
      scenarioElem.className = 'scenario ' + styles[Math.floor(Math.random() * styles.length)];
      ResetGame();
    }
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    console.log('Resized window');
    // Initialize moving objects again
    const { updatedBoardEdges, updatedDir, updatedBall, updatedPaddle1, updatedPaddle2 } = UpdateMovingObjects();
    boardEdges = updatedBoardEdges;
    dir = updatedDir;
    ball = updatedBall;
    paddle1 = updatedPaddle1;
    paddle2 = updatedPaddle2;
    ResetGame();
  });

  // Call to the loop function
  Loop();
}

// Function to create new moving objects after window resize
function UpdateMovingObjects(): {
  updatedBoardEdges: edges;
  updatedDir: number;
  updatedBall: Ball;
  updatedPaddle1: paddle;
  updatedPaddle2: paddle;
} {
  const updatedBoardEdges = new edges(0, scenarioElem.offsetWidth, 0, scenarioElem.offsetHeight);
  const updatedDir = RandDir();
  const updatedBall = new Ball(updatedBoardEdges, document.querySelector('.ball'), 300, Math.cos(updatedDir), Math.sin(updatedDir), 0.1);
  const updatedPaddle1 = new paddle(updatedBoardEdges, document.querySelector('.paddle1'), 400, 1.15, keyboard, 'w', 's');
  const updatedPaddle2 = new paddle(updatedBoardEdges, document.querySelector('.paddle2'), 400, 1.15, keyboard, 'ArrowUp', 'ArrowDown');

  return { updatedBoardEdges, updatedDir, updatedBall, updatedPaddle1, updatedPaddle2 };
}

// Function to calculate the deltaTime and call Update in each frame
function Loop() {
  deltaTime = (Date.now() - time) / 1000; //deltaTime in seconds
  time = Date.now();
  Update();
  requestAnimationFrame(Loop);
}
