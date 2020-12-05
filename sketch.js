var monkey , monkey_running,ground,invisibleGround;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survialTime = 0;
var ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600,400);

  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  //Monkey
  monkey = createSprite(50, 250, 10, 10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
 //Ground
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  
 invisibleGround = createSprite(400,350,900,10);
  invisibleGround.visible = true;
  
}
function draw() {
  background (225);
  
  stroke("black");
    fill("black");
      textSize(20);
   survialTime = Math.ceil(frameCount/frameRate());
  text("Survial Time:"+  survialTime, 100, 50);

  monkey.collide(ground);
  //PLAY
  if(gameState === PLAY){
      monkey.changeAnimation("running", monkey_running);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")) {
        monkey.velocityY = -12;
    }    
    
    if(FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
    }
   
  
  monkey.velocityY = monkey.velocityY + 0.5;
   obstacleGroup.setLifetimeEach(12);
    
    
  Food();
  obstacles();
    
  if(obstacleGroup.isTouching(monkey)){
          gameState = END;
       }
  }
   if (gameState === END) {
     obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
     survialTime.visible = false;
   }
  monkey.collide(invisibleGround);
  
  drawSprites();
}
function Food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    FoodGroup.add(banana);
  }
}

//Obstacles
function obstacles() {
  if (frameCount % 300 === 0){
    obstacle = createSprite(250,325,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1 ;
     obstacleGroup.add(obstacle);
  }

}


 
 


