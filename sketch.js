var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg,boyDieImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var PLAY = 1
var END= 0;
var gameState = PLAY;
var gameOver, endImg;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  boyDieImg = loadAnimation("runner1.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(600,600);
// Moving background
path=createSprite(300,300);
path.addImage(pathImg);
path.velocityY = 4;

  gameOver = createSprite(300,300,10,10);
  gameOver.addImage(endImg);
  gameOver.scale = 0.6

//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.addAnimation("boy_collided",boyDieImg);
boy.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  if (gameState === PLAY){
   if(path.y > 400 ){
    path.y = height/2;
  }  
    gameOver.visible =false
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
      
      if (cashG.isTouching(boy)) {
      cashG.destroyEach();
        treasureCollection = treasureCollection+1
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection+3
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection+4
      
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState = END
        
    }
      
      
  }
  }else if(gameState === END){
    path.velocityY = 0;
    boy.changeAnimation("boy_collided", boyDieImg);
    cashG.setLifetimeEach(-1);
    diamondsG.setLifetimeEach(-1);
    jwelleryG.setLifetimeEach(-1);
    swordGroup.setLifetimeEach(-1);
    cashG.setVelocityYEach(0);
    diamondsG.setVelocityYEach(0);
    jwelleryG.setVelocityYEach(0);
    swordGroup.setVelocityYEach(0);
    gameOver.visible = true;
    boy.destroy();
  }
  
  
   

  

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,250,30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 550),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 120 == 0) {
  var diamonds = createSprite(Math.round(random(50, 550),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 120 == 0) {
  var jwellery = createSprite(Math.round(random(50, 550),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 550),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}