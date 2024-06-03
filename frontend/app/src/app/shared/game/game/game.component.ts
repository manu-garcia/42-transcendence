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
  anyPowerUp: boolean = false;
  updatePowerUps: boolean = false;
  velocityBoost: boolean = false;
  freeze: boolean = false;
  appearance: string = 'default';
  updateAppearance: boolean = false;

  // Global reference
  static instance: GameComponent;

  constructor(public translate: TranslateService) {
    GameComponent.instance = this;
  }

  ngOnInit(): void {
    // Check if there is an active power up
    this.checkAnyPowerUp();
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

  checkAnyPowerUp(): void {
    this.anyPowerUp = this.velocityBoost || this.freeze;
  }

  onVelocityBoostChange(enabled: boolean) {
    this.velocityBoost = enabled;
    this.updatePowerUps = true;
  }

  onFreezeChange(enabled: boolean) {
    this.freeze = enabled;
    this.updatePowerUps = true;
  }

  onAppearanceChange(value: string) {
    this.appearance = value;
    this.updateAppearance = true;
  }
}

// Class for the objects of the board
class edges {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  constructor(minX: number, maxX: number, minY: number, maxY: number) {
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

  constructor(boardEdges: edges, elem: HTMLElement, vel: number) {
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

  constructor(boardEdges: edges, elem: HTMLElement, vel: number, dirX: number, dirY: number, drag: number) {
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
  BounceX(paddleInertia: number, deviation: number) {
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
  Reset(vel: number, x: number, y: number, dirX: number, dirY: number) {
    this.vel = vel;
    this.x = x;
    this.y = y;
    this.dirX = dirX;
    this.dirY = dirY;
    super.ResetMovingObject();
  }
}

// Class for the power-ups
class PowerUp extends MovingObject {
  dirY: number;
  activePowerUps: string[];
  actualPowerUp: string;

  constructor(boardEdges: edges, elem: HTMLElement, vel: number, dirY: number) {
    super(boardEdges, elem, vel);
    this.dirY = dirY;
    this.BuildPowerUps();
    this.y = 0;
  }

  // Method to update active power ups and choose one
  BuildPowerUps() {
    this.activePowerUps = [];
    if (GameComponent.instance.velocityBoost) {
      this.activePowerUps.push('Velocity Boost');
    }
    if (GameComponent.instance.freeze) {
      this.activePowerUps.push('Freeze');
    }

    this.actualPowerUp = this.activePowerUps[Math.floor(Math.random() * this.activePowerUps.length)];

    let powerUpInitial: HTMLElement = document.querySelector('.powerUp');
    if (powerUpInitial) {
      if (this.actualPowerUp == 'Velocity Boost') {
        powerUpInitial.innerHTML = `V`;
      } else if (this.actualPowerUp == 'Freeze') {
        powerUpInitial.innerHTML = 'F';
      }
    }
  }

  // Getter for ActualPowerUp
  getActualPowerUp() {
    return this.actualPowerUp;
  }

  // Method to move the ball
  Move() {
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

  // Method to manage bounce in the Y axis
  BounceY() {
    this.dirY = -this.dirY;
  }

  // Method to check collision with another object
  CheckColision(edges2: edges) {
    let edges1: edges = this.GetEdges();
    return !(
      edges1.maxX < edges2.minX ||
      edges1.minX > edges2.maxX ||
      edges1.maxY < edges2.minY ||
      edges1.minY > edges2.maxY
    );
  }

  // Method to Reset the powerUp
  Reset(vel: number, x: number, y: number, dirY: number) {
    this.vel = vel;
    this.x = x;
    this.y = y;
    this.dirY = dirY;
    super.ResetMovingObject();
    this.BuildPowerUps();
  }
}

// Class for the paddles
class paddle extends MovingObject {
  keyboard: Keyboard;
  actualSpeed: number;
  friction: number;
  keyCodeUp: string;
  keyCodeDown: string;
  isFrozen: number;

  constructor(
    boardEdges: edges,
    elem: HTMLElement,
    vel: number,
    friction: number,
    keyboard: Keyboard,
    keyCodeUp: string,
    keyCodeDown: string
  ) {
    super(boardEdges, elem, vel);
    this.keyboard = keyboard;
    this.actualSpeed = 0;
    this.friction = friction;
    this.keyCodeUp = keyCodeUp;
    this.keyCodeDown = keyCodeDown;
    this.isFrozen = 0;
  }

  // Method to move the paddle
  Move() {
    // While the paddle is frozen it can't move
    if (this.isFrozen > 0) return;

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
  CheckColision(edges2: edges) {
    let edges1: edges = this.GetEdges();
    return !(
      edges1.maxX < edges2.minX ||
      edges1.minX > edges2.maxX ||
      edges1.maxY < edges2.minY ||
      edges1.minY > edges2.maxY
    );
  }

  // Method to calculate the deviation in the Y axis when hitting the ball
  CheckDeviationY(edges2: edges) {
    let edges1: edges = this.GetEdges();
    let middle2Y: number = (edges2.maxY + edges2.minY) / 2;
    let relativePos: number = (middle2Y - edges1.minY) / (edges1.maxY - edges1.minY);
    return relativePos * 2 - 1;
  }
}

// Class for the Scoreboard
class Scoreboard {
  elem: HTMLElement;
  points: number;
  constructor(elem: HTMLElement) {
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
  keyPressed(evento: KeyboardEvent) {
    if (evento.key === 'ArrowUp' || evento.key === 'ArrowDown') {
      evento.preventDefault();
    }
    this.pressedKeys[evento.key] = true;
  }

  // Method to register the release of a key
  keyReleased(evento: KeyboardEvent) {
    this.pressedKeys[evento.key] = false;
  }

  // Method to check if a key is pressed
  isPressed(tecla: string) {
    return !!this.pressedKeys[tecla];
  }
}

// Function to generate a random motion direction in radians
function RandDir() {
  // Array with motion direction options in radians
  let optionsDir: number[] = [
    Math.PI / 4, // 45 degrees
    (3 * Math.PI) / 4, // 135 degrees
    (5 * Math.PI) / 4, // 225 degrees
    (7 * Math.PI) / 4, // 315 degrees
  ];
  let randomIndex: number = Math.floor(Math.random() * optionsDir.length);
  return optionsDir[randomIndex];
}

// Update function that is called in each frame
function Update() {
  ball.Move();
  if (GameComponent.instance.anyPowerUp) {
    powerUp.Move();
    CheckPowerUpCollision();
  }
  MovePaddles();
  CheckPaddleCollision();
  CheckGoal();
  CheckEndGame();
  UpdateFrozenTimers();
  CheckUpdatePowerUps();
  CheckUpdateAppearance();
}

// Update power-ups after a change in options
function CheckUpdatePowerUps() {
  if (GameComponent.instance.updatePowerUps) {
    if (GameComponent.instance.velocityBoost || GameComponent.instance.freeze) {
      GameComponent.instance.anyPowerUp = true;
      if (!powerUp) {
        setTimeout(() => {
          // Wait for DOM to update
          let powerUpDOM: HTMLElement = document.querySelector('.powerUp');
          if (powerUpDOM) {
            powerUp = new PowerUp(boardEdges, powerUpDOM, 300, 0.4);
          }
        }, 0);
      } else {
        powerUp = new PowerUp(boardEdges, document.querySelector('.powerUp'), 300, 0.4);
      }
    } else {
      GameComponent.instance.anyPowerUp = false;
      if (powerUp) {
        // Remove powerUp from DOM
        let powerUpElement: HTMLElement = document.querySelector('.powerUp');
        if (powerUpElement) {
          powerUpElement.remove();
        }
        // Old powerUp object is not useful anymore
        powerUp = null;
      }
    }
    GameComponent.instance.updatePowerUps = false;
  }
}

function CheckUpdateAppearance() {
  if (GameComponent.instance.updateAppearance) {
    // Change the appearance of the game
    if (GameComponent.instance.appearance == 'default') {
      scenarioElem.className = 'scenario';
    } else {
      scenarioElem.className = 'scenario ' + GameComponent.instance.appearance;
    }
    GameComponent.instance.updateAppearance = false;
  }
}

// Function that updates the frozen timers of the paddles
function UpdateFrozenTimers() {
  if (paddle1.isFrozen > 0) {
    paddle1.isFrozen -= deltaTime;
    if (paddle1.isFrozen < 0) paddle1.isFrozen = 0;
  }
  if (paddle2.isFrozen > 0) {
    paddle2.isFrozen -= deltaTime;
    if (paddle2.isFrozen < 0) paddle2.isFrozen = 0;
  }
  if (GameComponent.instance.fourPlayer) {
    if (paddle3.isFrozen > 0) {
      paddle3.isFrozen -= deltaTime;
      if (paddle3.isFrozen < 0) paddle3.isFrozen = 0;
    }
    if (paddle4.isFrozen > 0) {
      paddle4.isFrozen -= deltaTime;
      if (paddle4.isFrozen < 0) paddle4.isFrozen = 0;
    }
  }
}

// Function to move the paddles
function MovePaddles() {
  paddle1.Move();
  paddle1.ProgressiveStop();
  paddle2.Move();
  paddle2.ProgressiveStop();
  if (GameComponent.instance.fourPlayer) {
    paddle3.Move();
    paddle3.ProgressiveStop();
    paddle4.Move();
    paddle4.ProgressiveStop();
  }
}

// Function to check collisions with the paddles
function CheckPaddleCollision() {
  let ballEdges: edges = ball.GetEdges();
  if (paddle1.CheckColision(ballEdges)) {
    if (ball.dirX < 0) {
      let deviation: number = paddle1.CheckDeviationY(ballEdges);
      ball.BounceX(paddle1.actualSpeed * deltaTime, deviation);
    }
  } else if (paddle2.CheckColision(ballEdges)) {
    if (ball.dirX > 0) {
      let deviation: number = paddle2.CheckDeviationY(ballEdges);
      ball.BounceX(paddle2.actualSpeed * deltaTime, deviation);
    }
  }
  if (GameComponent.instance.fourPlayer) {
    if (paddle3.CheckColision(ballEdges)) {
      if (ball.dirX < 0) {
        let deviation: number = paddle3.CheckDeviationY(ballEdges);
        ball.BounceX(paddle3.actualSpeed * deltaTime, deviation);
      }
    } else if (paddle4.CheckColision(ballEdges)) {
      if (ball.dirX > 0) {
        let deviation: number = paddle4.CheckDeviationY(ballEdges);
        ball.BounceX(paddle4.actualSpeed * deltaTime, deviation);
      }
    }
  }
}

// Function to check if there is a goal
function CheckGoal() {
  let result: number = ball.CheckGoal();
  if (result != 0 && !GameComponent.instance.gameOver) {
    if (result == 1) {
      scoreboard1.ScorePoint();
    } else if (result == 2) {
      scoreboard2.ScorePoint();
    }
    ResetGame();
  }
}

// Function to check collisions with the paddles
function CheckPowerUpCollision() {
  let ballEdges: edges = ball.GetEdges();
  if (powerUp.CheckColision(ballEdges)) {
    if (powerUp.actualPowerUp == 'Velocity Boost') {
      // Boost ball's velocity
      ball.vel = ball.vel * 1.5;
    } else if (powerUp.actualPowerUp == 'Freeze') {
      // Freeze opponent group's paddles for 1 second
      FreezePaddles();
    }
  }
}

// Function to freeze opponent's paddles
function FreezePaddles() {
  if (ball.dirX < 0) {
    paddle1.isFrozen = 1; // Frozen for 1 second
    if (GameComponent.instance.fourPlayer) {
      paddle3.isFrozen = 1;
    }
  } else {
    paddle2.isFrozen = 1;
    if (GameComponent.instance.fourPlayer) {
      paddle4.isFrozen = 1;
    }
  }
}

// Function to check if the game is over
function CheckEndGame() {
  let endGameMessage: HTMLElement = document.querySelector('.end-game-message');

  // endGameMessage is null while game is not over
  if (endGameMessage) {
    GameComponent.instance.isPaused = true;
    if (scoreboard1.points == maxPoints) {
      if (GameComponent.instance.fourPlayer) {
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
      if (GameComponent.instance.fourPlayer) {
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
  if (GameComponent.instance.fourPlayer) {
    paddle3.ResetMovingObject();
    paddle4.ResetMovingObject();
  }
  // Get a random direction
  let dir: number = RandDir();
  // Calculate half the width and height of the scenario
  let halfWidthScenario: number = scenarioElem.offsetWidth / 2;
  let halfHeightScenario: number = scenarioElem.offsetHeight / 2;
  // Reset the ball with the new direction and position
  ball.Reset(300, halfWidthScenario, halfHeightScenario, Math.cos(dir), Math.sin(dir));
  // Reset the power-up if any
  if (GameComponent.instance.anyPowerUp) {
    powerUp.Reset(300, halfWidthScenario, 0, 0.4);
  } else {
    if (powerUp) {
      // Remove powerUp from DOM
      let powerUpElement: Element = document.querySelector('.powerUp');
      if (powerUpElement) {
        powerUpElement.remove();
      }
      // Old powerUp object is not useful anymore
      powerUp = null;
    }
  }
}

// Game restart after end of match function
function ResetEndGame() {
  GameComponent.instance.gameOver = false;
  scoreboard1.Reset();
  scoreboard2.Reset();
  ResetGame();
}

// VARIABLES OF THE GAME
let scenarioElem: HTMLElement;
let boardEdges: edges;
let dir: number;
let ball: Ball;
let powerUp: PowerUp;
let keyboard: Keyboard;
let paddle1: paddle;
let paddle2: paddle;
let paddle3: paddle;
let paddle4: paddle;
let scoreboard1: Scoreboard;
let scoreboard2: Scoreboard;
let time: number;
let deltaTime: number;
let maxPoints: number = 5;

// Function that inits game variables
function InitGame(match: IEventMatch) {
  // Check if we have a match and print it
  if (match) {
    console.log('Match:', match);
  } else {
    // Handle error if match is null or undefined
    console.error('No match data available.');
    return;
  }
  scenarioElem = document.querySelector('.scenario');
  keyboard = new Keyboard();
  boardEdges = new edges(0, scenarioElem.offsetWidth, 0, scenarioElem.offsetHeight);
  dir = RandDir();
  ball = new Ball(boardEdges, document.querySelector('.ball'), 300, Math.cos(dir), Math.sin(dir), 0.1);
  if (GameComponent.instance.anyPowerUp) {
    powerUp = new PowerUp(boardEdges, document.querySelector('.powerUp'), 300, 0.4);
  }
  paddle1 = new paddle(boardEdges, document.querySelector('.paddle1'), 400, 1.15, keyboard, 'w', 's');
  paddle2 = new paddle(boardEdges, document.querySelector('.paddle2'), 400, 1.15, keyboard, 'o', 'l');
  if (GameComponent.instance.fourPlayer) {
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
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    type UpdatedElements = {
      updatedBoardEdges: edges;
      updatedDir: number;
      updatedBall: Ball;
      updatedPaddle1: paddle;
      updatedPaddle2: paddle;
      updatedPaddle3?: paddle;
      updatedPaddle4?: paddle;
      updatedPowerUp?: PowerUp;
    };
    // Initialize moving objects again
    let {
      updatedBoardEdges,
      updatedDir,
      updatedBall,
      updatedPaddle1,
      updatedPaddle2,
      updatedPaddle3,
      updatedPaddle4,
      updatedPowerUp,
    }: UpdatedElements = UpdateMovingObjects();

    // Update board edges and dir
    boardEdges = updatedBoardEdges;
    dir = updatedDir;

    // Preserve the ball's current direction and speed and update it
    updatedBall.dirX = ball.dirX;
    updatedBall.dirY = ball.dirY;
    updatedBall.vel = ball.vel;
    updatedBall.x = ball.x * (updatedBoardEdges.maxX / boardEdges.maxX);
    updatedBall.y = ball.y * (updatedBoardEdges.maxY / boardEdges.maxY);
    ball = updatedBall;

    // Preserve the power-up's current direction and speed and update it
    if (GameComponent.instance.anyPowerUp) {
      updatedPowerUp.dirY = powerUp.dirY;
      updatedPowerUp.vel = powerUp.vel;
      updatedPowerUp.x = powerUp.x * (updatedBoardEdges.maxX / boardEdges.maxX);
      updatedPowerUp.y = powerUp.y * (updatedBoardEdges.maxY / boardEdges.maxY);
      powerUp = updatedPowerUp;
    }
    // Preserve paddles' positions and update them
    updatedPaddle1.y = paddle1.y * (updatedBoardEdges.maxY / boardEdges.maxY);
    updatedPaddle2.y = paddle2.y * (updatedBoardEdges.maxY / boardEdges.maxY);
    paddle1 = updatedPaddle1;
    paddle2 = updatedPaddle2;
    if (GameComponent.instance.fourPlayer) {
      updatedPaddle3.y = paddle3.y * (updatedBoardEdges.maxY / boardEdges.maxY);
      updatedPaddle4.y = paddle4.y * (updatedBoardEdges.maxY / boardEdges.maxY);
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
  updatedPowerUp?: PowerUp;
} {
  let updatedBoardEdges: edges = new edges(0, scenarioElem.offsetWidth, 0, scenarioElem.offsetHeight);
  let updatedDir: number = RandDir();
  let updatedBall: Ball = new Ball(
    updatedBoardEdges,
    document.querySelector('.ball'),
    300,
    Math.cos(updatedDir),
    Math.sin(updatedDir),
    0.1
  );
  let updatedPaddle1: paddle = new paddle(
    updatedBoardEdges,
    document.querySelector('.paddle1'),
    400,
    1.15,
    keyboard,
    'w',
    's'
  );
  let updatedPaddle2: paddle = new paddle(
    updatedBoardEdges,
    document.querySelector('.paddle2'),
    400,
    1.15,
    keyboard,
    'o',
    'l'
  );
  let updatedPowerUp: PowerUp;
  if (GameComponent.instance.anyPowerUp) {
    updatedPowerUp = new PowerUp(updatedBoardEdges, document.querySelector('.powerUp'), 300, 0.4);
  }
  let updatedPaddle3: paddle, updatedPaddle4: paddle;
  if (GameComponent.instance.fourPlayer) {
    updatedPaddle3 = new paddle(updatedBoardEdges, document.querySelector('.paddle3'), 400, 1.15, keyboard, 'r', 'f');
    updatedPaddle4 = new paddle(updatedBoardEdges, document.querySelector('.paddle4'), 400, 1.15, keyboard, 'u', 'j');
  }

  return {
    updatedBoardEdges,
    updatedDir,
    updatedBall,
    updatedPaddle1,
    updatedPaddle2,
    updatedPaddle3,
    updatedPaddle4,
    updatedPowerUp,
  };
}

// Function to update player information display
function updatePlayerInfo(match: IEventMatch) {
  // This function updates the player information displayed in the HTML
  let controls1: HTMLElement = document.querySelector('.controls1');
  let controls2: HTMLElement = document.querySelector('.controls2');
  let controls3: HTMLElement = document.querySelector('.controls3');
  let controls4: HTMLElement = document.querySelector('.controls4');

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
    let maxDeltaTime: number = 0.1;
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
