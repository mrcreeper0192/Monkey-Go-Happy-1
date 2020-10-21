
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score=0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
  
  //creating monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  
  foodGroup=createGroup();
  obstacleGroup=createGroup();

  
  
}


function draw() {
  background("white");
  
  //monkey's controls
  if (keyDown("space")){
    monkey.velocityY=-12;
  }
  
  monkey.velocityY=monkey.velocityY+0.8
  monkey.collide(ground);
  if (ground.x<0){
    ground.x=ground.width/2;
  }
  
  spawnFood();
  spawnObstacles();
  
  drawSprites();
  
  textSize(20);
  score=Math.ceil(frameCount/frameRate());
  text("Survival Time:" + score,100,50);
  if (obstacleGroup.isTouching(monkey)){
    ground.velocityX=0;
    monkey.velocityY=0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  }
  
}

function spawnFood(){
  if (frameCount%80===0){
    banana = createSprite(600,250,40,10);
    banana.addImage(bananaImage);
    banana.scale=0.05;
    banana.velocityX=-5;
    banana.y=Math.round(random(120,200));
    banana.lifetime=300;
    
    monkey.depth=banana.depth+1;
    foodGroup.add(banana);
  }
}

function spawnObstacles(){
   if (frameCount%300===0){
    obstacle = createSprite(800,320,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
    obstacle.velocityX=-5;
    obstacle.lifetime=300;
     
    obstacleGroup.add(obstacle);
  }
}
