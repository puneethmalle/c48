var PLAY = 1;
var END = 0;
var gameState = PLAY;

var zombieimg, zombie;
var bg,bgImg;
var engine;
var player, playerimg;
var playerGun, gunimg;
var playerBullets, bulletimg;
var score = 0;
var bulletGroup, zombieGroup;
var gameOverimg, gameOver, resetimg, restart;


function preload(){
zombieimg = loadImage("zombie1.png");
bgImg = loadImage("background.jpg");
playerimg = loadImage("player.png");
gunimg = loadImage("gun.png")
bulletimg = loadImage("bullet.png");
gameOverimg = loadImage("gameover.png");
resetimg = loadImage("reset.png");


}

function setup(){


    createCanvas(1000,500)

    //engine = Engine.create();
    //world = engine.world;


bg = createSprite(500,250);
bg.addImage(bgImg);
bg.scale =3.0;

player = createSprite(200,355);
player.addImage(playerimg);
player.scale = 1.25;

restart = createSprite(500,350);
restart.addImage(resetimg);
restart.visible = false;
restart.scale = 0.25;

gameOver = createSprite(500,150);
gameOver.addImage(gameOverimg);
gameOver.visible = false;



bulletGroup = new Group;
zombieGroup = new Group;

score  = 0  ;
stroke("red");
fill("red");
textSize(30);
    
   
    
}

function draw(){
    background(0);



    if(gameState === PLAY){

    //Engine.update(engine);
    rectMode(CENTER);
    //spawnZombies();
    player.visible = true;
   

    player.debug= true;
    player.setCollider("circle",0,0,90);
    
    
    if(keyIsDown(32)){
        //playerBullets.velocityX = 10;
        //playerBullets.x=playerBullets.x;
        //playerBullets.y=playerBullets.y;
        shootBullet();

    }
    if(zombieGroup.overlap(bulletGroup)){
        playerBullets.x=player.x+50
        playerBullets.y = player.y+25
        playerBullets.velocityX = 0;
       // zombieGroup.destroyEach();
       zombieGroup[0].destroy();
        bulletGroup.destroyEach(playerBullets);   
        score+=50; 
    }
    if(keyIsDown(UP_ARROW) && player.y>100 ){
        player.y-=10;
    }
    if(keyIsDown(DOWN_ARROW) && player.y<400 ){
        player.y+=10; 
    }
    if (frameCount % 50 === 0) {
        spawnZombies();
      }
    if(zombieGroup.collide(player)){
        player.velocityY = 0.0;
        player.visible = false;
        player.y = 350;

        gameState = END;
    }
    if(score>=50){
        zombieGroup.setVelocityXEach(0); 
 zombieGroup.setVelocityYEach(0); 
 zombieGroup.setVisibleEach(false);
 text("Victory",700,50);
        gameState === END;
    }

   
}

else if (gameState === END) {
    restart.visible = true;
    gameOver.visible = true;

if(mousePressedOver(restart)) {
    reset();
  }


  
  
  bulletGroup.setVelocityXEach(0); 
 bulletGroup.setVelocityYEach(0);
 bulletGroup.setVisibleEach(false);
 
 
 
 zombieGroup.setVelocityXEach(0); 
 zombieGroup.setVelocityYEach(0); 
 zombieGroup.setVisibleEach(false);


}


drawSprites();
    
text("Score:"+score,100,50);

}
function reset(){

    gameState = PLAY;
    restart.visible = false; 
    gameOver.visible = false;
    score = 0;
    
    

    
}
function shootBullet(){
    playerBullets = createSprite(250,380);
    playerBullets.y= player.y+25;
    playerBullets.addImage(bulletimg);
    playerBullets.velocityX= 10;
    playerBullets.setCollider("circle",0,0,30);
    playerBullets.scale=0.25;  
    bulletGroup.add(playerBullets);
  }
  function spawnZombies(){
    if(World.frameCount % 10 === 0){
    zombie = createSprite(800,355);
    zombie.addImage(zombieimg);
    zombie.velocityX = -(10 + score/100);
    zombieGroup.add(zombie);
  }
}
