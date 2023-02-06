var groundImg, ground;
var boyImg, boy;
var brick, brickImg;
var gold, goldImg;
var bricksGroup, goldsGroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score;

function preload() {
  boyImg = loadImage("images/boyImg.png");
  brickImg = loadImage("images/brickImg.png");
  goldImg = loadImage("images/goldImg.png");
  gameOverImg = loadImage("images/gameOverImg.png");
}

function setup() {
  createCanvas(675, 675);

  boy = createSprite(80, 320, 10, 10);
  boy.addImage(boyImg);
  boy.scale = 0.7;

  boy.setCollider("rectangle", 15, 0, 60, 200, 180);
  //boy.debug = true;

  bricksGroup = new Group();
  goldsGroup = new Group();

  score = 0;
}

function draw() {
  background("black");

  textSize(25);
  text("Score : " + score, 510, 30);

  if (gameState === PLAY) {
    if (keyDown("up")) {
      boy.y = boy.y - 3;
    }
    if (keyDown("down")) {
      boy.y = boy.y + 3;
    }
    if (keyDown("left")) {
      boy.x = boy.x - 3;
    }
    if (keyDown("right")) {
      boy.x = boy.x + 3;
    }

    addBricks();
    addGold();

    if (boy.isTouching(goldsGroup)) {
      score = score + 50;
      goldsGroup.destroyEach();
    }

    if (boy.isTouching(bricksGroup)) {
      gameState = END;
      bricksGroup.destroyEach();
    }
  } else if (gameState === END) {
    bricksGroup.setVelocityEach(0);
    goldsGroup.setVelocityEach(0);
    bricksGroup.destroyEach();
    goldsGroup.destroyEach();

    boy.addImage(gameOverImg);
    boy.scale = 1.5;
    boy.x = 300;
    boy.y = 300;
  }

  drawSprites();
}

function addBricks() {
  if (frameCount % 150 === 0) {
    brick = createSprite(650, 300, 10, 10);
    brick.velocityX = -2.8;
    brick.addImage(brickImg);
    brick.y = Math.round(random(10, 500));
    brick.scale = 0.3;
    brick.lifetime = 400;

    boy.depth = brick.depth;
    boy.depth = boy.depth + 1;

    brick.setCollider("rectangle", 15, 0, 60, 200, -90);
    //brick.debug = true;

    bricksGroup.add(brick);
  }
}

function addGold() {
  if (frameCount % 250 === 0) {
    gold = createSprite(650, 300, 10, 10);
    gold.velocityX = -2;
    gold.addImage(goldImg);

    gold.y = Math.round(random(10, 450));
    gold.scale = 0.3;

    gold.lifetime = 400;

    gold.setCollider("rectangle", 15, 0, 60, 200, -90);
    //gold.debug = true;

    goldsGroup.add(gold);
  }
}
