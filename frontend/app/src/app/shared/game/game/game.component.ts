import { Component, Input, OnInit } from '@angular/core';
import { IEventMatch } from 'shared/event/event';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  @Input() match: IEventMatch;

  fourPlayer: boolean = false;
  showOptions: boolean = false;
  isPaused: boolean = false;
  gameOver: boolean = false;

  // Global reference
  static instance: GameComponent;

  constructor(public translate: TranslateService) {
    GameComponent.instance = this;
  }

  ngOnInit(): void {
    // Check if 2v2 or 1v1 game
    this.checkFourPlayer();
  }

  ngAfterViewInit(): void {
    // Start game
    InitGame(this.match);
  }

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  checkFourPlayer(): void {
    if (this.match.group1.users.length === 2 && this.match.group2.users.length === 2) {
      this.fourPlayer = true;
    }
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

  // Method to reset points and update the Scoreboard
  Reset() {
    this.points = 0;
    this.elem.innerHTML = '0';
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
  CheckEndGame();
}

// Function to move the paddles
function MovePaddles() {
  paddle1.Move();
  paddle1.ProgressiveStop();
  paddle2.Move();
  paddle2.ProgressiveStop();
  if (fourPlayer) {
    paddle3.Move();
    paddle3.ProgressiveStop();
    paddle4.Move();
    paddle4.ProgressiveStop();
  }
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
  if (fourPlayer) {
    if (paddle3.CheckColision(ballEdges)) {
      if (ball.dirX < 0) {
        var deviation = paddle3.CheckDeviationY(ballEdges);
        ball.BounceX(paddle3.actualSpeed * deltaTime, deviation);
      }
    } else if (paddle4.CheckColision(ballEdges)) {
      if (ball.dirX > 0) {
        var deviation = paddle4.CheckDeviationY(ballEdges);
        ball.BounceX(paddle4.actualSpeed * deltaTime, deviation);
      }
    }
  }
}

// Function to check if there is a goal
function CheckGoal() {
  var result = ball.CheckGoal();
  if (result != 0 && !GameComponent.instance.gameOver) {
    if (result == 1) {
      scoreboard1.ScorePoint();
    } else if (result == 2) {
      scoreboard2.ScorePoint();
    }
    ResetGame();
  }
}

// Function to check if the game is over
function CheckEndGame() {
  const endGameMessage = document.querySelector('.end-game-message');

  // endGameMessage is null while game is not over
  if (endGameMessage) {
    GameComponent.instance.isPaused = true;
    if (scoreboard1.points == maxPoints) {
      if (fourPlayer) {
        endGameMessage.innerHTML = `${
          GameComponent.instance.match.group1.users[0].username
        } ${GameComponent.instance.translate.instant('shared.game.game.win_message_1')} ${
          GameComponent.instance.match.group1.users[1].username
        } ${GameComponent.instance.translate.instant('shared.game.game.win_message_2')}`;
      } else {
        endGameMessage.innerHTML = `${
          GameComponent.instance.match.group1.users[0].username
        } ${GameComponent.instance.translate.instant('shared.game.game.win_message_3')}`;
      }
      endGameMessage.innerHTML =
        endGameMessage.innerHTML + ` ${GameComponent.instance.translate.instant('shared.game.game.reset')}`;
    } else {
      if (fourPlayer) {
        endGameMessage.innerHTML = `${
          GameComponent.instance.match.group2.users[0].username
        } ${GameComponent.instance.translate.instant('shared.game.game.win_message_1')} ${
          GameComponent.instance.match.group2.users[1].username
        } ${GameComponent.instance.translate.instant('shared.game.game.win_message_2')}`;
      } else {
        endGameMessage.innerHTML = `${
          GameComponent.instance.match.group2.users[0].username
        } ${GameComponent.instance.translate.instant('shared.game.game.win_message_3')}`;
      }
      endGameMessage.innerHTML =
        endGameMessage.innerHTML + ` ${GameComponent.instance.translate.instant('shared.game.game.reset')}`;
    }
  } else if (scoreboard1.points >= maxPoints || scoreboard2.points >= maxPoints) {
    GameComponent.instance.gameOver = true;
  }
}

// Game restart function
function ResetGame() {
  paddle1.ResetMovingObject();
  paddle2.ResetMovingObject();
  if (fourPlayer) {
    paddle3.ResetMovingObject();
    paddle4.ResetMovingObject();
  }
  var dir = RandDir();
  // Calculate half the width and height of the scenario
  var halfWidthScenario = scenarioElem.offsetWidth / 2;
  var halfHeightScenario = scenarioElem.offsetHeight / 2;
  ball.Reset(300, halfWidthScenario, halfHeightScenario, Math.cos(dir), Math.sin(dir));
}

// Game restart after end of match function
function ResetEndGame() {
  GameComponent.instance.gameOver = false;
  scoreboard1.Reset();
  scoreboard2.Reset();
  ResetGame();
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
var paddle3;
var paddle4;
var scoreboard1;
var scoreboard2;
var time;
var deltaTime;
var fourPlayer = false;
var maxPoints = 5;

// Function that inits game variables
function InitGame(match: IEventMatch) {
  // Check if we have a match and print it
  if (match) {
    console.log('Match:', match);
    if (match.group1.users.length == 2) {
      fourPlayer = true;
    }
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
  paddle2 = new paddle(boardEdges, document.querySelector('.paddle2'), 400, 1.15, keyboard, 'o', 'l');
  if (fourPlayer) {
    paddle3 = new paddle(boardEdges, document.querySelector('.paddle3'), 400, 1.15, keyboard, 'r', 'f');
    paddle4 = new paddle(boardEdges, document.querySelector('.paddle4'), 400, 1.15, keyboard, 'u', 'j');
  }
  updatePlayerInfo(match);
  scoreboard1 = new Scoreboard(document.querySelector('.scoreboard1'));
  scoreboard2 = new Scoreboard(document.querySelector('.scoreboard2'));
  time = Date.now();
  deltaTime = 0;

  // Event listener for the 'keydown' event
  document.addEventListener('keydown', function (event) {
    // Check if the key pressed is Escape
    if (event.code === 'Escape') {
      if (GameComponent.instance.gameOver) {
        ResetEndGame();
      } else {
        GameComponent.instance.isPaused = !GameComponent.instance.isPaused;
        GameComponent.instance.showOptions = GameComponent.instance.isPaused;
      }
    }

    // Check if the key pressed is the space bar
    if (event.code === 'Space') {
      // Pause the game
      GameComponent.instance.isPaused = true;
      // Show options
      GameComponent.instance.showOptions = true;
      // Change the appearance of the game
      scenarioElem.className = 'scenario ' + styles[Math.floor(Math.random() * styles.length)];
    }
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    // Initialize moving objects again
    const {
      updatedBoardEdges,
      updatedDir,
      updatedBall,
      updatedPaddle1,
      updatedPaddle2,
      updatedPaddle3,
      updatedPaddle4,
    } = UpdateMovingObjects();

    // Preserve the ball's current direction and speed
    updatedBall.dirX = ball.dirX;
    updatedBall.dirY = ball.dirY;
    updatedBall.vel = ball.vel;
    updatedBall.x = ball.x * (updatedBoardEdges.maxX / boardEdges.maxX);
    updatedBall.y = ball.y * (updatedBoardEdges.maxY / boardEdges.maxY);

    // Preserve paddles' positions
    updatedPaddle1.y = paddle1.y * (updatedBoardEdges.maxY / boardEdges.maxY);
    updatedPaddle2.y = paddle2.y * (updatedBoardEdges.maxY / boardEdges.maxY);
    if (fourPlayer) {
      updatedPaddle3.y = paddle3.y * (updatedBoardEdges.maxY / boardEdges.maxY);
      updatedPaddle4.y = paddle4.y * (updatedBoardEdges.maxY / boardEdges.maxY);
    }

    boardEdges = updatedBoardEdges;
    dir = updatedDir;
    ball = updatedBall;
    paddle1 = updatedPaddle1;
    paddle2 = updatedPaddle2;
    if (fourPlayer) {
      paddle3 = updatedPaddle3;
      paddle4 = updatedPaddle4;
    }

    // Pause the game
    GameComponent.instance.isPaused = true;
    // Show options
    GameComponent.instance.showOptions = true;

    // Update the position after resize
    Update();
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
  updatedPaddle3?: paddle;
  updatedPaddle4?: paddle;
} {
  const updatedBoardEdges = new edges(0, scenarioElem.offsetWidth, 0, scenarioElem.offsetHeight);
  const updatedDir = RandDir();
  const updatedBall = new Ball(
    updatedBoardEdges,
    document.querySelector('.ball'),
    300,
    Math.cos(updatedDir),
    Math.sin(updatedDir),
    0.1
  );
  const updatedPaddle1 = new paddle(
    updatedBoardEdges,
    document.querySelector('.paddle1'),
    400,
    1.15,
    keyboard,
    'w',
    's'
  );
  const updatedPaddle2 = new paddle(
    updatedBoardEdges,
    document.querySelector('.paddle2'),
    400,
    1.15,
    keyboard,
    'o',
    'l'
  );

  let updatedPaddle3, updatedPaddle4;
  if (fourPlayer) {
    updatedPaddle3 = new paddle(updatedBoardEdges, document.querySelector('.paddle3'), 400, 1.15, keyboard, 'r', 'f');
    updatedPaddle4 = new paddle(updatedBoardEdges, document.querySelector('.paddle4'), 400, 1.15, keyboard, 'u', 'j');
  }

  return { updatedBoardEdges, updatedDir, updatedBall, updatedPaddle1, updatedPaddle2, updatedPaddle3, updatedPaddle4 };
}

// Function to update player information display
function updatePlayerInfo(match: IEventMatch) {
  // This function updates the player information displayed in the HTML
  const controls1 = document.querySelector('.controls1');
  const controls2 = document.querySelector('.controls2');
  const controls3 = document.querySelector('.controls3');
  const controls4 = document.querySelector('.controls4');

  if (controls1 && controls2) {
    controls1.innerHTML = `${paddle1.keyCodeUp} / ${paddle1.keyCodeDown}`;
    controls2.innerHTML = `${paddle2.keyCodeUp} / ${paddle2.keyCodeDown}`;
    if (controls3 && controls4 && match.group1.users.length > 1 && match.group2.users.length > 1) {
      controls3.innerHTML = `${paddle3.keyCodeUp} / ${paddle3.keyCodeDown}`;
      controls4.innerHTML = `${paddle4.keyCodeUp} / ${paddle4.keyCodeDown}`;
    }
  } else {
    console.error('Player info elements not found');
  }
}

// Function to calculate the deltaTime and call Update in each frame
function Loop() {
  // Update isPaused if options toggled
  if (GameComponent.instance.showOptions && !GameComponent.instance.isPaused) {
    GameComponent.instance.isPaused = true;
  }
  if (!GameComponent.instance.isPaused) {
    let currentTime = Date.now();
    deltaTime = (currentTime - time) / 1000; // deltaTime in seconds
    // Limit deltaTime to 0.1 seconds
    const maxDeltaTime = 0.1;
    if (deltaTime > maxDeltaTime) {
      deltaTime = maxDeltaTime;
    }
    time = currentTime;
    Update();
  } else {
    // If game is paused, update `time` to prevent deltaTime out of control
    time = Date.now();
  }
  requestAnimationFrame(Loop);
}
