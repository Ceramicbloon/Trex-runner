var trex, trex_running, edges, ground, ground1, cloud, cloud1, cloud2, cacti, cacti1, cacti2, cacti3, cacti4, cacti5, cacti6, rand, group1, group2, death, restartbutton, restart1, gameover, gameover1, jump, dsound, checkpoint
var score = 0;
const PLAY = 1;
const END = 0;
var gamestate = PLAY;


function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  ground1 = loadImage("ground2.png")
  cloud1 = loadImage("cloud.png");
  cacti1 = loadImage("obstacle1.png")
  cacti2 = loadImage("obstacle2.png")
  cacti3 = loadImage("obstacle3.png")
  cacti4 = loadImage("obstacle4.png")
  cacti5 = loadImage("obstacle5.png")
  cacti6 = loadImage("obstacle6.png")
  death = loadAnimation("trex_collided.png")
  gameover1 = loadImage('gameOver.png')
  restart1 = loadImage('restart.png')
  dsound = loadSound('die.mp3')
  jump = loadSound('jump.mp3')
  checkpoint = loadSound('checkPoint.mp3')
}

function spawnclouds() {

  if (frameCount % 50 == 0) {
    cloud = createSprite(600, Math.round(random(20, 120)), 20, 20);
    cloud.velocityX = ground.velocityX + 3;
    cloud.addImage("cloud", cloud1);
    cloud.depth = 3;
    trex.depth = cloud.depth + 1;
    cloud.lifetime = 70;
    group2.add(cloud)
  }
  if (frameCount % 40 == 0) {
    cloud2 = createSprite(600, Math.round(random(20, 120)), 20, 20)
    cloud2.velocityX = ground.velocityX + 6;
    cloud2.addImage("cloud", cloud1);
    cloud2.scale = 0.7;
    cloud2.depth = 1;
    cloud2.lifetime = 90
    group2.add(cloud2)
  }
}

function cactus() {
  if (frameCount % 65 == 0) {
    var rand = Math.round(random(1, 6.4))
    cacti = createSprite(700, 155, 10, 10);
    cacti.velocityX = ground.velocityX
    switch (rand) {
      case 1:
        cacti.addImage('cacti', cacti1)
        break;
      case 2:
        cacti.addImage('cacti', cacti2)
        break;
      case 3:
        cacti.addImage('cacti', cacti3)
        break;
      case 4:
        cacti.addImage('cacti', cacti4)
        cacti.scale = 0.7
        break;
      case 5:
        cacti.addImage('cacti', cacti5)
        cacti.scale = 0.7
        break;
      case 6:
        cacti.addImage('cacti', cacti6);
        cacti.scale = 0.65
        break;

    }
    //cacti.debug = true
    cacti.depth = 2;
    cacti.lifetime = 70;
    group1.add(cacti)

  }
}

// function restarting() {
 
// }
function reset(){
  gamestate = PLAY
  trex.changeAnimation('running', trex_running)
  group1.destroyEach();
  group2.destroyEach();
  ground.velocityX = -13;
  frameCount = 0
}

function setup() {
  gameover = createSprite(300, 90, 10, 10)
  gameover.addImage('reset', gameover1)
  restartbutton = createSprite(300, 130, 10, 10)
  restartbutton.addImage('reset', restart1)
  restartbutton.scale = 0.5 
  //frameRate(60)

  createCanvas(600, 200);
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation('death', death)
  //ground that trex is actually running on
  invisground = createSprite(300, 190, 600, 5);
  invisground.visible = false;
  //ground stuff
  ground = createSprite(300, 180, 100, 10);
  ground.addImage("ground", ground1);
  ground.velocityX = -13;
  //edges
  edges = createEdgeSprites();
  group1 = new Group()
  group2 = new Group()
 
  trex.setCollider("circle", 0, 0, 40)
  //trex.debug = true; 
}

function draw() {
  if (gamestate === PLAY) {
    restartbutton.visible = false
  gameover.visible = false

  //score = score+getFrameRate()/60
    spawnclouds();
    cactus();
    score = Math.floor(frameCount / 5)

    if (keyDown("space") && trex.y >= 164) {
      jump.play();
      trex.velocityY = -14;
    }
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    trex.velocityY = trex.velocityY + 1;
    if (trex.isTouching(group1)) {
      dsound.play();
      
      gamestate = END
    }
    if (score % 100 == 0 && score > 0) {
      ground.velocityX = ground.velocityX -0.4
      checkpoint.play();
    }
  } else if (gamestate === END) {
    trex.changeAnimation("death", death);
    ground.velocityX = 0
    group1.setVelocityXEach(0)
    group2.setVelocityXEach(0)
    trex.velocityY = 0;
    group1.setLifetimeEach(-1);
    group2.setLifetimeEach(-1);
    restartbutton.visible = true
  gameover.visible = true
    //restarting();
  }
  if(mousePressedOver(restartbutton)&&gamestate === END){
    reset();

  }

  background("white");

  textSize(16)
  textFont('fontRegular')
  text("Score:" + score, 520, 20)

  // a bunch of if stuff





  trex.collide(invisground);

  drawSprites();


}